import Link from "next/link";

function index() {
  return (
    <div>

      <main>
        <h1>Hello world!</h1>
        <p>hello nomCue!</p>


        <div>
          <h2>Food</h2>
          <Link href="/food">
            <a>Food</a>
          </Link>
        </div>


        <div>
          <h2>Activities</h2>
          <Link href="/activities">
            <a>Activities</a>
          </Link>
        </div>

      </main>

    </div>
  );
}

export default index;
