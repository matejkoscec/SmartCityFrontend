import { basePath } from "@/api/paths.ts";

export default class HttpClient {
  basePath: string;
  loggingEnabled: boolean = false;
  onError: (errorResponse: ErrorResponse) => Promise<void> | void;

  constructor(
    basePath: string,
    loggingEnabled: boolean,
    onError: (errorResponse: ErrorResponse) => Promise<void> | void,
  ) {
    this.basePath = basePath;
    this.loggingEnabled = loggingEnabled;
    this.onError = onError;
  }

  public async get<R = unknown>(path: string, config?: Config): Promise<R> {
    return this.execute("get", path, undefined, config);
  }

  public async post<R = unknown, B = unknown>(path: string, body?: B, config?: Config): Promise<R> {
    return this.execute("post", path, body, config);
  }

  public async put<R = unknown, B = unknown>(path: string, body?: B, config?: Config): Promise<R> {
    return this.execute("put", path, body, config);
  }

  public async delete<R = unknown>(path: string, config?: Config): Promise<R> {
    return this.execute("delete", path, undefined, config);
  }

  private async execute<B, R>(method: string, path: string, body?: B, config?: Config): Promise<R> {
    const ignoreBasePath = path.startsWith("http");
    let fullPath = `${ignoreBasePath ? "" : basePath}${path}`;
    if (config?.params) {
      fullPath += `?${new URLSearchParams(config.params).toString()}`;
    }

    const response = await fetch(fullPath, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      ...config?.fetchConfig,
    });

    if (!response.ok) {
      const defaultErrorResponse = { status: response.status, error: "An error occurred" };

      const contentLength = response.headers.get("content-length");
      if (contentLength && !Number(contentLength)) {
        await this.onError(defaultErrorResponse);
        throw new FetchError("FetchError", response.status, undefined);
      }

      let errorResponse = defaultErrorResponse;
      try {
        errorResponse = (await response.json()) as ErrorResponse;
      } catch (e) {
        if (this.loggingEnabled) {
          console.log(`[${method.toUpperCase()}] '${fullPath}' ${response.status}: errorData parsing to JSON failed`);
        }
      }

      await this.onError(errorResponse);

      throw new FetchError("FetchError", response.status, errorResponse);
    }

    if (this.loggingEnabled) {
      console.log(`[${method.toUpperCase()}] '${fullPath}' ${response.status}`);
    }
    if (response.status === 204) {
      return null as R;
    }

    try {
      return (await response.json()) as R;
    } catch (e) {
      if (this.loggingEnabled) {
        console.log(`[${method.toUpperCase()}] '${fullPath}' ${response.status}: data parsing to JSON failed`);
      }

      return null as R;
    }
  }
}

export type Config = {
  params?: Record<string, string>;
  encodeParams?: boolean;
  fetchConfig?: Omit<RequestInit, "method">;
};

export class FetchError extends Error {
  status: number;
  data?: ErrorResponse;

  constructor(message: string, status: number, data?: ErrorResponse) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export type ErrorResponse = {
  status: number;
  error: string;
  message?: string;
  validationErrors?: Record<string, string[]>;
};
