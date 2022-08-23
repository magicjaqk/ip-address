import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";
import React from "react";

type LocationDataType = {
  ip: string;
  city: string;
  region: string;
  region_code: string;
  country_code: string;
  country_code_iso3: string;
  country_name: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  asn: string;
  org: string;
};

const Home: NextPage = () => {
  const [locationData, setLocationData] =
    React.useState<LocationDataType | null>();
  const { data, error, isLoading } = trpc.useQuery(["ip.get"]);

  React.useEffect(() => {
    if (data?.ip) {
      fetch(`https://ipapi.co/${data.ip}/json/`)
        .then(function (response) {
          response.json().then((jsonData: LocationDataType) => {
            setLocationData(jsonData);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [data?.ip]);

  return (
    <>
      <Head>
        <title>What&apos;s your IP?</title>
        <meta name="description" content="Get your IP Address" />
      </Head>

      <div className="w-screen min-h-screen flex flex-col justify-center items-center p-4 overflow-y-scroll">
        {isLoading && "Loading..."}
        {error && <p>There was an error.</p>}
        {data && (
          <div className="max-w-lg">
            <p className="text-xl font-bold text-center mb-4">
              {locationData?.ip}
            </p>
            <p>City: {locationData?.city}</p>
            <p>State: {locationData?.region}</p>
            <p>Longitude: {locationData?.longitude}</p>
            <p>Latitude: {locationData?.latitude}</p>
            <p className="text-center mt-4 font-bold">Gotcha bitch.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
