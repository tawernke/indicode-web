import { NavBar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => (
  <>
    <NavBar />
    <div>Hello world</div>
  </>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
