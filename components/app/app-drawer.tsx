'use client'
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerFooter, DrawerHeader, DrawerRoot, DrawerTitle, DrawerTrigger } from "@/components/ui/chakra-drawer";
import { useModifyQuery } from "@/hooks/use-modify-query";
import { useQuery } from "@/hooks/use-query";
import { APP_DEFAULT_PAGE } from "@/lib/routes";
import { Button, DrawerBodyProps } from "@chakra-ui/react";
import { useParams, usePathname } from "next/navigation";
import AppDialog from "./app-dialog";

interface IAppDrawer extends DrawerBodyProps {
    trigger?: React.ReactNode,
    title?: string,
    body?: React.ReactNode,
    size: "sm" | "md" | "lg" | "xl" | "xs" | "full" | undefined,
    placement?: "bottom" | "top" | "start" | "end" | undefined
    rounded?: string,
    saveButtonTitle?: string
    onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>
    open?: boolean,
    setOpen?: (value: boolean) => void,
    redirectUri?: string,
    hasFooter?: boolean
    cancelQueryKey: string,
    onDiscardChange?: () => void
    confirmCancel?: boolean
}

function AppDrawer({
    trigger,
    title,
    body,
    size = 'sm',
    children,
    placement,
    rounded,
    onSubmit,
    open,
    redirectUri,
    hasFooter,
    cancelQueryKey,
    onDiscardChange,
    saveButtonTitle,
    confirmCancel = true,
    ...rest }: IAppDrawer) {

    const { user_id } = useParams();
    const { router, searchParams, open: cancelOpen } = useQuery(cancelQueryKey, 'true')
    const cancelDialogUrl = useModifyQuery(null, searchParams, [{ key: cancelQueryKey, value: 'true' }], 'set');
    const cancelRedirectUrl = useModifyQuery(null, searchParams, [{ key: cancelQueryKey }]);
    const pathName = usePathname();

    const handleClose = () => {
        router.push(cancelDialogUrl ?? APP_DEFAULT_PAGE());
    };

    const discardChange = () => {
        router.push(pathName.split('?')[0]);
    };

    const handleconfirmCancel = () => {
        if (confirmCancel)
            router.push(cancelDialogUrl)
        else
            discardChange();
    }


    return (
        <DrawerRoot open={open} onOpenChange={handleClose} key={size} size={size} placement={placement}>
            <DrawerBackdrop />
            {trigger && (<DrawerTrigger asChild>
                {trigger ?? <Button>Open</Button>}
            </DrawerTrigger>)}
            <DrawerContent offset={rounded && '4'} rounded={rounded && 'md'}>
                {title && <DrawerHeader>
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>}
                <DrawerBody {...rest}>
                    {body ?? children}
                </DrawerBody>
                {hasFooter && (<DrawerFooter>
                    <Button onClick={handleconfirmCancel} variant="outline">Cancel</Button>
                    <AppDialog
                        title="Are you sure you want to leave the page?"
                        body="You can save your changes, discard your changes, or cancel to continue editing."
                        onSubmit={onSubmit}
                        open={cancelOpen}
                        isDiscardChange
                        onDiscardChange={() => onDiscardChange ? onDiscardChange() : discardChange()}
                        placement='center'
                        redirectUri={cancelRedirectUrl}
                        asCancel={false}
                        cancelQueries={[]}
                        saveButtonTitle={saveButtonTitle}
                    />
                    <Button type="submit" bg='fg.success' color='fg.inverted' className="" onClick={(e) => {
                        if (onSubmit) onSubmit(e)
                            .then(x => { if (onDiscardChange) { onDiscardChange() } })

                    }}>{saveButtonTitle ?? "Save Changes"}</Button>
                </DrawerFooter>)}
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default AppDrawer