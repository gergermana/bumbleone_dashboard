import StudioWrapper from "@/features/studios/components/studio-wrapper";

export default function Studios() {
    return (
        <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                    <StudioWrapper/>
                </div>
            </div>
        </div>
    );
}