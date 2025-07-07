import { DataList } from "@chakra-ui/react"

function AppDataList(
    {
        data,
        size = "sm",
        orientation = "vertical",
        gap,
        className
    }: {
        data: {
            label: string,
            value: string | number | React.ReactNode
        }[],
        size?: "sm" | "md" | "lg"
        orientation?: "horizontal" | "vertical",
        gap?: string,
        className?: string
    }) {
    return (
        <DataList.Root orientation={orientation} className={className ?? ""} size={size}>
            {data.map((item) => (
                <DataList.Item key={item.label} gap={gap ?? "3"}>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                </DataList.Item>
            ))}
        </DataList.Root>

    )
}

export default AppDataList