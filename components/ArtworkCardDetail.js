import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../globals/store';

import useSWR from 'swr';
import { addToFavorites, removeFromFavorites } from '../lib/userData';

import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';

export default function ArtworkCardDetail(props) {
  const api = `https://collectionapi.metmuseum.org`;
  const urlRequest = props.objectID ? `${api}/public/collection/v1/objects/${props.objectID}` : null;
  const { data, error } = useSWR(urlRequest);

  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
  const [favorited, setFavorited] = useState(false);

  const toggleFavorites = async () => {
    if (favorited) {
      setFavoritesList(await removeFromFavorites(props.objectID));
    } else {
      setFavoritesList(await addToFavorites(props.objectID));
    }
    setFavorited(!favorited);
  };

  useEffect(() => {
    setFavorited(favoritesList?.includes(props.objectID));
  }, [favoritesList]);

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <Card>
          {data.primaryImage ? <Card.Img variant='top' src={data.primaryImage} /> : null}
          <Card.Body>
            <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
            <Card.Text>
              <p>
                <strong>Date: </strong>
                {data.objectDate ? data.objectDate : 'N/A'}
              </p>
              <p>
                <strong>Classification: </strong>
                {data.classification ? data.classification : 'N/A'}
              </p>
              <p>
                <strong>Medium: </strong>
                {data.medium ? data.medium : 'N/A'}
              </p>
              <br />
              <br />
              <p>
                <strong>Artist: </strong>
                {data.artistDisplayName ? (
                  <a href={data.artistWikidata_URL} target='_blank' rel='noreferrer'>
                    {data.artistDisplayName}
                  </a>
                ) : (
                  'N/A'
                )}
              </p>
              <p>
                <strong>Credit Line: </strong>
                {data.creditLine ? data.creditLine : 'N/A'}
              </p>
              <p>
                <strong>Dimensions: </strong>
                {data.dimensions ? data.dimensions : 'N/A'}
              </p>
              <br />
              <br />
              <Button variant={favorited ? 'outline-danger' : 'outline-light'} onClick={toggleFavorites}>
                {favorited ? '+ Favorite (added)' : '+ Favorite'}
              </Button>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );
}

// defines default props if any properties did not recieve values when rendering component
ArtworkCardDetail.defaultProps = {
  objectID: '',
};
