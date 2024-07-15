import { Textarea, Button, Input ,Card,
  CardBody,
  CardFooter,
 } from "@material-tailwind/react";
import AnimatedMulti from "../component/AnimatedMulti";
import { useSelector } from "react-redux";

function CustomNotification() {
  const { getEmpolyees } = useSelector((state) => state.GetEmployeeSlicer);
  return (
    <section className="p-4 grid grid-cols-1 md:grid-cols-5 gap-4 h-screen place-items-center   md:w-full">
      <div className="md:col-span-3 rounded-lg border p-4 shadow-lg h-fit w-full  overflow-auto bg-white shadow-purple-200 ">
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
      <div className="md:col-span-2 p-2  pt-8  flex flex-col gap-4 h-screen   overflow-y-auto ">
        <h1>
          {" "}
          <span className="text-2xl font-bold text-gray-800">Notification</span>{" "}
        </h1>
        <div className="overflow-y-auto flex flex-col gap-4 ">

      {[1,2,3,4,5,6].map((item,ind)=>(
      <Card key={ind} className=" bg-white w-full min-h-[200px] max-h-[400px] overflow-y-auto ">
      <CardBody>
        <div className="flex justify-between items-center mb-2">

        <p  className="text-lg font-bold capitalize">
          Title 
        </p>
        <span>
          <i className="fas fa-xmark text-green-500 mr-2"></i> 
        </span>
        </div>
        <p className="text-xs">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to &quot;Naviglio&quot; where you can enjoy the main
          night life in Barcelona.
        </p>
      </CardBody>
      <CardFooter className="pt-0">
        <Button className="w-fit text-xs" color="amber">sent notification to 5 person</Button>
      </CardFooter>
    </Card>))}
    </div>

      </div>
    </section>
  );
}

export default CustomNotification;
