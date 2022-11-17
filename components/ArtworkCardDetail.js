import { useState } from 'react';
import { useAtom } from 'jotai';
import { favoritesAtom } from '../store';

import useSWR from 'swr';

import Error from 'next/error';
import { Card } from 'react-bootstrap';

export default function ArtworkCardDetail(props) {
  const api = `https://collectionapi.metmuseum.org`;
  const urlRequest = props.objectID ? `${api}/public/collection/v1/objects/${props.objectID}` : null;
  const { data, error } = useSWR(urlRequest);

  const [favoritesList, setFavoritesList] = useAtom(favoritesAtom);
  const [favorited, setFavorited] = useState(favoritesList.includes(props.objectID) ? true : false);

  const toggleFavorites = () => {
    if (favorited) {
      setFavoritesList((current) => current.filter((favorite) => favorite != props.objectID));
    } else {
      setFavoritesList((current) => [...current, props.objectID]);
    }
    setFavorited(!favorited);
  };

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
              <button variant={favorited ? 'primary' : 'outline-primary'} onClick={toggleFavorites}>
                {favorited ? '+ Favorite (added)' : '+ Favorite'}
              </button>
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
