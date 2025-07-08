'use client'

import AppPageHeader from "@/components/app/app-page-header"
import { Stack } from "@chakra-ui/react"
import { Landmark } from "lucide-react"
// import AppLoader from "../_components/app-loader"

interface PageLayoutProps extends React.PropsWithChildren<{}> { }

function ParameterLayout({ children }: PageLayoutProps) {

    // const [user] = useAuth();

    // if (!user) return <AppLoader />;


    return (
        <>
            <AppPageHeader title="Billing" Icon={Landmark} />
            <Stack mx={{ base: '4', lg: '6' }} gap='6' pt='2'>
                {children}
            </Stack>
        </>

    )
}

export default ParameterLayout