import useSWR from 'swr';

import Error from 'next/error';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';

export default function ArtworkCard(props) {
  const api = `https://collectionapi.metmuseum.org`;
  const urlRequest = `${api}/public/collection/v1/objects/${props.objectID}`;
  const { data, error } = useSWR(urlRequest);

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <Card style={{ width: '18rem' }}>
          <Card.Img
            variant='top'
            src={`${
              data.primaryImageSmall
                ? data.primaryImageSmall // artwork thumbnail image src
                : 'https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d' // placeholder image src
            }`}
          />
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
            </Card.Text>
            <Link href={`/artwork/${data.objectID}`} passHref legacyBehavior>
              <Button variant='primary'>
                <p>
                  <strong>ID: </strong>
                  {data.objectID}
                </p>
              </Button>
            </Link>
          </Card.Body>
        </Card>
      ) : null}
    </>
  );
}

// defines default props if any properties did not recieve values when rendering component
ArtworkCard.defaultProps = {
  objectID: '',
};
