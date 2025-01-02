import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { selectUser } from "@/redux/features/auth/authSelector";
import { Loader } from "@/components/Loader";
import { useEffect } from "react";

type WithAdminAccessProps = {
  [key: string]: any;
};

const withAdminAccess = <P extends WithAdminAccessProps>(
  Component: React.ComponentType<P>
) => {
  return (props: P) => {
    const user = useSelector(selectUser);
    const router = useRouter();

    useEffect(() => {
      if (user && user.role !== "admin") {
        router.push("/orders");
      }
    }, [user, router]);

    if (user && user.role !== "admin") {
      return <Loader />;
    }

    return <Component {...props} />;
  };
};

export default withAdminAccess;
