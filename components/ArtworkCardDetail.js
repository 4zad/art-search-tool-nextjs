import Error from 'next/error';
import Link from 'next/link';
import { Button, Card } from 'react-bootstrap';

export default function ArtworkCardDetail(props) {
  const api = `https://collectionapi.metmuseum.org`;
  const urlRequest = `/public/collection/v1/objects/${props.objectID}`;
  const { data, error } = useSWR(urlRequest);

  return (
    <>
      {error ? (
        <Error statusCode={404} />
      ) : data ? (
        <Card style={{ width: '18rem' }}>
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
                    data.artistDisplayName
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
            </Card.Text>

            <Link href={`/artwork/${data.objectID}`} passHref>
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
MainNav.defaultProps = {
  objectID: '',
};
