import { AbsoluteCenter, ConditionalValue, ProgressCircle } from "@chakra-ui/react"

function AppChakraProgress({ value, size }: { value: number, size: ConditionalValue<"sm" | "md" | "lg" | "xl" | "xs" | undefined> }) {
    return (
        <ProgressCircle.Root size={size} value={30} colorPalette='brand'>
            <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range strokeLinecap="round" />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText />
            </AbsoluteCenter>
        </ProgressCircle.Root>
    )
}

export default AppChakraProgress