"use client";

import { fetchPersonDetails } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import css from "./PersonDetails.module.css";

const PersonDetailsClient = () => {
  const { id } = useParams();

  const { data: person } = useQuery({
    queryKey: ["personDetails", id],
    queryFn: () => fetchPersonDetails(String(id)),

    refetchOnMount: false,
  });

  return (
    <div className={css.personDetailsWrp}>
      <div className={css.detailsContainer}>
        <Image
          src={
            person?.profile_path
              ? `https://image.tmdb.org/t/p/original/${person?.profile_path}`
              : "/unknownPerson.PNG"
          }
          alt={person?.name ?? "Person photo"}
          width={400}
          height={750}
          style={{ objectFit: "contain" }}
          className={css.personImage}
        />

        <div>
          <h1 className={css.title}>{person?.name}</h1>
          <ul className={css.infoContainer}>
            {person?.birthday && (
              <li className={css.infoItem}>
                <p>Birthday: {person?.birthday}</p>
              </li>
            )}
            {person?.deathday && (
              <li className={css.infoItem}>
                <p>Deathday: {person?.deathday}</p>
              </li>
            )}
            {person?.place_of_birth && (
              <li className={css.infoItem}>
                <p>Place of birth: {person?.place_of_birth}</p>
              </li>
            )}
            {person?.biography && (
              <li className={css.infoItem}>
                <p>{person?.biography}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PersonDetailsClient;
