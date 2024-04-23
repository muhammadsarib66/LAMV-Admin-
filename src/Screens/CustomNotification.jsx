import { Textarea, Button, Input ,Card,
  CardBody,
  CardFooter,
  Typography, } from "@material-tailwind/react";
import AnimatedMulti from "../component/AnimatedMulti";
import { useSelector } from "react-redux";

function CustomNotification() {
  const { getEmpolyees } = useSelector((state) => state.GetEmployeeSlicer);
  console.log(getEmpolyees);
  return (
    <section className="ml-2 grid grid-cols-1 md:grid-cols-5 gap-4 md:w-[94%]">
      <div className="md:col-span-3 rounded-lg border p-4 shadow-lg h-fit shadow-purple-200 ">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {" "}
            Add New Notification{" "}
          </h1>

          <div className="relative flex flex-col gap-4 w-full m-2 pb-2">
            <Input
              variant="standard"
              label="Title"
              className="font-semibold"
              placeholder="Enter Your Title"
            />
            <Textarea
              variant="static"
              className=""
              placeholder="Enter Descripted Message "
              rows={8}
            />
            <div>
              <AnimatedMulti />
            </div>
            <div className="flex w-full justify-end py-1.5">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="red"
                  variant="text"
                  className="rounded-md"
                >
                  Cancel
                </Button>
                <Button size="sm" className="rounded-md">
                  Post Notification
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 p-2 shadow-lg  rounded-lg  flex flex-col gap-4 h-screen overflow-y-scroll border shadow-purple-200 ">
        <h1>
          {" "}
          <span className="text-2xl font-bold text-gray-800">Notification</span>{" "}
        </h1>
      {[1,2,3,4].map((item,ind)=>(
      <Card key={ind} className=" bg-gray-200 w-full h-fit ">
      <CardBody>
        <div className="flex justify-between items-center mb-2">

        <Typography variant="h5" color="blue-gray" className="mb-2">
          Title 
        </Typography>
        <span>
          <i className="fas fa-xmark text-green-500 mr-2"></i> 
        </span>
        </div>
        <Typography>
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="amber">sent notification to 5 person</Button>
      </CardFooter>
    </Card>))}

      </div>
    </section>
  );
}

export default CustomNotification;
