import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../globals/store';

import { Card, Col, Pagination, Row } from 'react-bootstrap';
import ArtworkCard from '../components/ArtworkCard';

import { PER_PAGE } from '../globals/data';

export default function Favorites() {
  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom); // holds IDs of all artwork in the favorites list
  const [page, setPage] = useState(1); // holds current page number
  const [artworkList, setArtworkList] = useState([]); // holds 2D array of values where each index in the outer array is a page and each index in the inner array is a artwork object ID number from the favorites list

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
    if (favoritesList.length > 0) {
      // splitting the 'favoritesList' into separate arrays of length of items on each page, 'PER_PAGE'
      let results = [];
      for (let i = 0; i < favoritesList.length; i += PER_PAGE) {
        const chunk = favoritesList.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [favoritesList]);

  return (
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
              <h4>Seems like there is nothing here yet... Try adding some new artwork to the list.</h4>
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
  );
}
