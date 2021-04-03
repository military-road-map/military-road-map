import { useRouter } from "next/router";

const Checklist = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{`checklist ${id}`}</div>;
};

export default Checklist;
