// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/">Home</Link>

      <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
	<div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
		<div className="flex flex-col justify-start m-2 lg:m-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">50+</p>
			<p className="text-sm sm:text-base">Clients</p>
		</div>
		<div className="flex flex-col justify-start m-2 lg:m-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">89K</p>
			<p className="text-sm sm:text-base">Followers on social media</p>
		</div>
		<div className="flex flex-col justify-start m-2 lg:m-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">3</p>
			<p className="text-sm sm:text-base">Published books</p>
		</div>
		<div className="flex flex-col justify-start m-2 lg:m-6">
			<p className="text-4xl font-bold leading-none lg:text-6xl">8</p>
			<p className="text-sm sm:text-base">TED talks</p>
		</div>
	</div>
</section>
    </div>
    
  );
}

export default About;
