import { DataList } from "@chakra-ui/react"

function AppDataList({ data, size = "sm" }: { data: { label: string, value: string }[], size?: "sm" | "md" | "lg" }) {
    return (
        <DataList.Root orientation="vertical" className="w-full" size={size}>
            {data.map((item) => (
                <DataList.Item key={item.label} gap='3'>
                    <DataList.ItemLabel>{item.label}</DataList.ItemLabel>
                    <DataList.ItemValue>{item.value}</DataList.ItemValue>
                </DataList.Item>
            ))}
        </DataList.Root>

    )
}

export default AppDataList