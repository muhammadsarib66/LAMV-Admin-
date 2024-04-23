/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { baseUrl } from "../../features/slicer/Slicer";
import { Chip } from "@material-tailwind/react";
import { setIsModalClose } from "../../features/slicer/GetBookingSlicer";
import { MapPinIcon } from "@heroicons/react/24/solid";
import GoogleMapReact from "google-map-react";
// import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
// import { useMemo } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "87%",
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,

  p: 4,
};

export default function BookingDetailModal({ bookingDetail }) {
  const { isModalOpen } = useSelector((state) => state.GetBookingSlicer);
  const dispatch = useDispatch();
  const GOOGLE_API_KEY = "AIzaSyD_Q_4oINoF9y41aNa-Rp2E8BzGuMSfE0I";

  // const { isLoaded } = useLoadScript({
  //   googleMapsApiKey: GOOGLE_API_KEY,
  // });
  // const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  const {
    photos,
    mainCategory,
    address,
    bookingStatus,
    subCategories,
    attachedBudget,
  } = bookingDetail;

  const handleClose = () => dispatch(setIsModalClose());

  return (
    <div>
      <Modal
        className="overflow-y-scroll"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-scroll w-[700px]  ">
          <div className="flex justify-end ">
            {" "}
            <i
              onClick={handleClose}
              className="cursor-pointer text-2xl fa-solid fa-xmark"
            ></i>
          </div>
          <div className="flex flex-col gap-4">
            <Typography id="modal-modal-title" variant="h4" component="h2">
              Booking Detail
            </Typography>
            <div className="flex flex-col gap-4">
              <p>
                <span className="font-bold">Title: </span> {address?.title}
              </p>
              <p>
                <span className="font-bold">Type: </span> {address?.type}
              </p>
              <p>
                <span className="font-bold">address: </span> {address?.address}
              </p>
              <p>
                <span className="font-bold">Description: </span>{" "}
                {bookingDetail?.description}
              </p>
              <p className="flex gap-3">
                <span className="font-bold">bookingStatus: </span>
                <Chip
                  variant="ghost"
                  className="w-fit"
                  color={`${
                    (bookingStatus === "Active" && "green") ||
                    (bookingStatus === "Pending" && "gray") ||
                    (bookingStatus === "Cancelled" && "red") ||
                    (bookingStatus === "Completed" && "blue") ||
                    (bookingStatus === "Ongoing" && "orange")
                  }`}
                  value={`${bookingStatus && bookingStatus}`}
                />
              </p>
              <p>
                <span className="font-bold">mainCategory: </span>{" "}
                {mainCategory?.title}
              </p>
              <div className="flex flex-col gap-4">
                <span className="font-bold">Sub Category: </span>
                {subCategories?.length > 0 &&
                  subCategories?.map((subcat) => (
                    <div className="flex flex-col gap-3" key={subcat?._id}>
                      <p>
                        <span className="font-bold">SubCategory Title: </span>{" "}
                        {subcat?.title}
                      </p>
                      <span className="flex gap-3 font-bold">
                        Sub Category Status :
                        <Chip
                          className="w-fit"
                          color={`${subcat?.isDisabled ? "green" : "red"}`}
                          value={`${
                            subcat?.isDisabled ? "Active" : "Disabled"
                          }`}
                          text={"false"}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            {attachedBudget && (
              <div>
                <p className="font-bold">Budget Attch</p>

                <div style={{ width: "100%", height: "800px" }}>
                  <iframe
                    src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                      baseUrl + attachedBudget
                    )}&embedded=true`}
                    title="PDF Viewer"
                    style={{ width: "100%", height: "100%", border: "none" }}
                    frameBorder="0"
                  >
                    <p>Your browser does not support iframes.</p>
                  </iframe>
                </div>
              </div>
            )}
            {photos && (
              <div className="flex gap-4  bg-gray-200 rounded-md p-2 ">
                <p>Images:</p>
                {photos?.map((item, index) => {
                  return (
                    <img
                      key={index}
                      src={baseUrl + item}
                      alt="image"
                      className={` duration-300 w-44 h-44`}
                    />
                  );
                })}
              </div>
            )}
            <div>
              <p>
                <span className="font-bold">GeoCodedLocation: </span>{" "}
                {address?.geocodedLocation}
              </p>
            </div>
            <div className="h-52 w-full">
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                center={{
                  lat: address?.latitude,
                  lng: address?.longitude,
                }}
                defaultZoom={16}
                // draggable={false} // Disable map dragging
                zoomControl={false} // Disable zoom controls
                scrollwheel={false} // Disable scroll wheel zoom
              >
                <Marker lat={address?.latitude} lng={address?.longitude} />
              </GoogleMapReact>
              {/* {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={10}
        >
          <Marker position={{ lat: address?.latitude,
          lng: address?.longitude, }} />
        </GoogleMap>
      )} */}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
const Marker = () => (
  <div style={{ color: "red" }}>
    <MapPinIcon className="text-red-800 h-9 w-9" />
  </div>
);
