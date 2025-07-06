// "use client";
// import React from "react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "../ui/sdcn-drawer";
// import FormContainer from "../../app/general-setup/_component/forms/FormContainer";
// import Image from "next/image";

// const DrawerComponent = ({
//   drawerTrigger,
//   children,
//   title,
//   description,
//   isOpen,
//   onClose,
// }: Readonly<{
//   drawerTrigger?: React.ReactNode;
//   children: React.ReactNode;
//   title: string;
//   description?: string;
//   isOpen?: boolean;
//   onClose?: () => void;
// }>) => {
//   return (
//     <Drawer
//       direction="right"
//       open={isOpen}
//       onOpenChange={(isOpen) => {
//         if (!isOpen) {
//           onClose?.(); // Trigger onClose when it should close
//         }
//       }}
//     >
//       <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
//       <DrawerContent>
//         <div className="mx-auto w-full ">
//           <FormContainer title={title} description={description || ""}>
//             {children}
//           </FormContainer>
//         </div>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default DrawerComponent;
