/*********************************************************************************************
 * WEB422 – Assignment 04
 *
 * Name: Muhammad Ahmed
 * Student ID: 146908207
 * Date: 11-04-2022
 *
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *********************************************************************************************/

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useSWR from 'swr';

import Error from 'next/error';
import { Card, Col, Pagination, Row } from 'react-bootstrap';
import ArtworkCard from '../../components/ArtworkCard';

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(); // holds 2D array of values where each index in the outer array is a page and each index in the inner array is a artwork object ID number from the API call
  const [page, setPage] = useState(1); // holds current page number

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1]; // gets the query string from url and splits it so that only the part after the '?' remains
  const api = `https://collectionapi.metmuseum.org`;
  const urlRequest = `${api}/public/collection/v1/search?${finalQuery}`;

  const { data, error } = useSWR(urlRequest);
  console.log(urlRequest);

  const previousPage = () => {
    if (page > 1) {
      setPage((currentValue) => currentValue - 1);
    }
  };

  const nextPage = () => {
    if (page < artworkList.length || !(data.length < PER_PAGE)) {
      setPage((currentValue) => currentValue + 1);
    }
  };

  useEffect(() => {
    if (data) {
      // splitting the data recieved from API fetch into separate arrays of length of items on each page, 'PER_PAGE'
      let results = [];
      for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
        const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : artworkList ? (
        <>
          <Row className='gy-4'>
            {artworkList.length > 0 ? (
              artworkList[page - 1].map((objID) => (
                <Col lg={3} key={objID}>
                  <ArtworkCard objectID={objID} />
                </Col>
              ))
            ) : (
              <Card>
                <Card.Body>
                  <h4>Nothing Here</h4>
                </Card.Body>
              </Card>
            )}
          </Row>

          <Row className='gy-4'>
            {artworkList.length > 0 ? (
              <Pagination /*size='lg'*/>
                <Pagination.Prev onClick={() => previousPage()} />
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Next onClick={() => nextPage()} />
              </Pagination>
            ) : null}
          </Row>
        </>
      ) : null}
    </>
  );
}
