export async function getServerSideProps() {
  const res = await fetch('http://localhost:3000/api/data');
  const data = await res.json();
  return { props: { data } };
}

const DataPage = ({ data }) => (
  <div>
    <h1>Data Page</h1>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);

export default DataPage;
