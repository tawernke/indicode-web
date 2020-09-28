import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { PageLayout } from "../components/PageLayout";

const Index = () => (
  <PageLayout>
    <div>Hello world</div>
  </PageLayout>
)

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
