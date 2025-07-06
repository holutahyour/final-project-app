import Image from "next/image";

function AppLogo() {
    return (
        <a href="#" className="flex p-2">
            <Image
                src={"/assets/images/logo.png"}
                alt="educate logo"
                //fill
                height={10} // Increased height
                width={40.5} // Proportionally increased width (original was 86.9 for height 55)
                className=""
            />
        </a>
    );
}

export default AppLogo;
