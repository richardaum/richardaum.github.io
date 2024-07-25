/* eslint-disable import/no-unused-modules */
import { ImageResponse } from "next/og";

export const size = {
  width: 16,
  height: 16,
};
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="16" height="16" rx="6" fill="#BAAEAE" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.87846 8.40819C2.70245 8.16428 2.70245 7.83606 2.87846 7.59216L5.22175 4.34497L5.82179 4.77242L3.49253 8.00017L5.8218 11.2279L5.22175 11.6554L2.87846 8.40819Z"
          fill="white"
          fill-opacity="0.63"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M5.1655 4.00035L6.16836 4.71474L3.79747 8.00017L6.16836 11.2856L5.1655 12L2.67928 8.55475C2.44024 8.2235 2.44024 7.77684 2.67928 7.4456L5.1655 4.00035ZM3.49253 8.00017L5.82179 4.77242L5.22175 4.34497L2.87846 7.59216C2.70245 7.83606 2.70245 8.16428 2.87846 8.40819L5.22175 11.6554L5.8218 11.2279L3.49253 8.00017Z"
          fill="white"
          fill-opacity="0.63"
        />
        <path
          d="M13.3202 7.43783C13.5599 7.76939 13.5599 8.21691 13.3202 8.54847L10.8342 11.9863L9.83208 11.2709L12.2023 7.99315L9.87962 4.78111L7.98914 11.8582L6.79857 11.5443L8.80635 4.02806L9.99692 4.342L9.91252 4.65794L10.8342 4L13.3202 7.43783Z"
          fill="white"
          fill-opacity="0.63"
        />
      </svg>
    ),
    { ...size },
  );
}
