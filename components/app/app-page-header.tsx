import { Heading, HStack } from "@chakra-ui/react"
import { LucideProps } from "lucide-react";
import { Children, ForwardRefExoticComponent, RefAttributes } from "react";

function AppPageHeader({ title, Icon, children }: {
    title: string, 
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    children?: React.ReactNode
}) {
    return (
        <HStack justify='space-between' mx='4'>
            <HStack>
                <Icon />
                <Heading className="capitalize" size="xl" fontWeight='bolder'>{title}</Heading>
            </HStack>
            {children}
        </HStack>
    )
}

export default AppPageHeader