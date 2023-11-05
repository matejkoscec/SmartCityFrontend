import {Card} from "@/components/ui/card.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";
import {useAuth} from "@/provider/AuthProvider.tsx";
import {AspectRatio} from "@/components/ui/aspect-ratio.tsx";
import {useGetAllReservations} from "@/api/reservations/reservations.ts";

export default function Profile() {

    const {user} = useAuth();
    const {data, isLoading, error} = useGetAllReservations();

    if (isLoading) {
        return <div>Loading...</div>;
    }
    //
    // if (error) {
    //     return <div>Error</div>;
    // }

    return <>(
        <div className={"col-auto"}>
            <Card className={
                "flex flex-col gap-4 p-8 w-full max-w-[600px] mx-auto mt-8 bg-background border border-input"
            }>
                <h1 className={"text-2xl font-semibold"}>Profile</h1>
                <div className={"flex-row"}>
                    <Avatar className={""}>
                        <AspectRatio ratio={1}>
                            <img
                                src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=100&q=100"
                                alt="profile"/>
                        </AspectRatio>
                    </Avatar>
                    <a>
                        <h2 className={"text-xl font-semibold"}>{user?.name}</h2>
                        <p className={"text-sm text-muted-foreground"}/>
                    </a>
                    <a>
                        <h2 className={"text-xl font-semibold"}>{user?.preferredUsername}</h2>
                    </a>
                </div>
            </Card>
            <Card
                className={"flex flex-col gap-4 p-8 w-full max-w-[600px] mx-auto mt-8 bg-background border border-input"}>
                <div className={"flex flex-col space-y-1.5 p-6"}>
                    <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>
                        Past reservations
                    </h3>
                    <p className={"text-sm text-muted-foreground"}>
                        See your past reservations
                    </p>
                    {data?.map((reservation) => {
                            return (
                                <div className={"flex flex-col space-y-1.5 p-6"}>
                                    <h3 className={"text-2xl font-semibold leading-none tracking-tight"}>
                                        {reservation.parkingSpotId}
                                    </h3>
                                    <p className={"text-sm text-muted-foreground"}>
                                        {reservation.end}
                                    </p>
                                </div>
                            )
                        }
                    )
                    }
                </div>
            </Card>
        </div>
    </>;

}
