import React, { useState, useEffect } from 'react';
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';
import Footer from './components/Footer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Navbar from './components/Navbar';

function App() {
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [term, setTerm] = useState('');

	useEffect(() => {
		fetch(
			`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
		)
			.then((res) => res.json())
			.then((data) => {
				setImages(data.hits);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	}, [term]);

	return (
		<>
			<Navbar />
			<div className='container mx-auto px-5'>
				<ImageSearch searchText={(text) => setTerm(text)} />

				{!isLoading && images.length === 0 && (
					<h1 className='text-5xl text-center mx-auto mt-32'>
						No Images Found
					</h1>
				)}

				{isLoading ? (
					<SkeletonTheme color='#e3f6f5' highlightColor='#ffffff'>
						<Skeleton
							height={400}
							width={350}
							duration={2}
							count={9}
							style={{ margin: '30px' }}
						/>
					</SkeletonTheme>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:mx-5'>
						{images.map((image) => (
							<ImageCard key={image.id} image={image} />
						))}
					</div>
				)}
			</div>
			<Footer />
		</>
	);
}

export default App;
