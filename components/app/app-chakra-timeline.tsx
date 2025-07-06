import { Timeline } from "@chakra-ui/react"
import { timeStamp } from "console"
import { ReactNode } from "react"
import { LuCheck, LuPackage, LuShip } from "react-icons/lu"

function AppChakraTimelines({ timelines }: { timelines: { icon: ReactNode, title: string, description: string, timestamp: string, status: string }[] }) {
    return (
        <Timeline.Root maxW="400px">
            {timelines.map(({ icon, title, timestamp }, index) => (
                <Timeline.Item key={index}>
                    <Timeline.Connector>
                        <Timeline.Separator />
                        <Timeline.Indicator>
                            {icon ?? <LuCheck />}
                        </Timeline.Indicator>
                    </Timeline.Connector>
                    <Timeline.Content>
                        <Timeline.Title>{title}</Timeline.Title>
                        <Timeline.Description>
                            {new Date(timestamp).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </Timeline.Description>
                    </Timeline.Content>
                </Timeline.Item>))
            }
        </Timeline.Root>
    )
}

export default AppChakraTimelines