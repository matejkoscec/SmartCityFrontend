import {Card} from "@/components/ui/card.tsx";
import ferrari from "@/assets/ferrari-sp48-unica.webp";

export default function Home() {
    return <>
        <div className={"col-auto"}>
            <Card className={
                "flex flex-col gap-4 p-8 w-full max-w-[600px] mx-auto mt-8 bg-background border border-input"
            }>
                <div className={"flex-row align-middle"}>
                    <a>
                        <h2 className={"text-9xl font-semibold text-center"}>Welcome to ParkirAI!</h2>
                        <p className={"text-sm text-muted-foreground"}/>
                    </a>
                    <img src={ferrari} alt={"feraro"}/>
                </div>
            </Card>
        </div>
    </>;
}