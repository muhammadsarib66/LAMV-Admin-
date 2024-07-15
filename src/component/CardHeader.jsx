
import {
  CardHeader,
  Input,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon, PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";

const Header = ({
  handleAddBtn,
  setStatusTab,
  statusTabs,
  heading,
  headingDetail,
  setSearch,
  BtnTitle,
  StatusTabVal
}) => {
  const handleTabChange = (value) => setStatusTab(value);

const handleCLick = () => {
  handleAddBtn();
}
  return (
    <CardHeader
    floated={false}
    shadow={false}
    className="  rounded-none"
    placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="h-fit  mb-6 flex items-center justify-between gap-8">
        <div>
          <Typography
            variant="h5"
            color="blue-gray"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {heading}
          </Typography>
          {headingDetail && (
            <Typography
              placeholder=""
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
              color="gray"
              className="mt-1 font-normal"
            >
              {headingDetail}
              
            </Typography>
          )}
        </div>
          {BtnTitle &&
        <div>
           
          <Button
          onClick={handleCLick}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            className="flex items-center gap-3"
            size="sm"
          >{
            BtnTitle === "Add Product" ? <PlusIcon className="h-5 w-5"/> : <PlusCircleIcon  className="h-5 w-5"/>
          }
             {BtnTitle}
          </Button>
          
        </div>
          }
      </div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs value={StatusTabVal ?? "all"} className="w-full md:w-max">
          <TabsHeader
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            {statusTabs?.map(({ label, value }) => (
              <Tab
                placeholder=""
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
                onClick={() => handleTabChange(value)}
                key={value}
                value={value}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            onChange={(e) => setSearch(e.target.value)}
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            crossOrigin=""
          />
        </div>
      </div>
    </CardHeader>
  );
};

export default Header;
