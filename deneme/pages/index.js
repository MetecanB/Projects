import { fetchData } from '../src/components/data';

function Home({ data }) {
  return (
    <div>
      <h1>Data from MySQL Database</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            <strong>Name:</strong> {item.name}, <strong>Address:</strong> {item.address}
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}

export default Home;
