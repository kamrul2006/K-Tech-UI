import { FiExternalLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import UseProduct from '../../Hooks/UseProduct';
import UpVoteButton from '../AllProducts/UpVoteButton';



const FeaturedProducts = () => {
    const [allProduct, refetch] = UseProduct()
    // console.log(allProduct)


    return (
        <section className="py-16 px-8 md:px-0 bg-gray-100 text-center">
            <h2 className="text-2xl font-semibold mb-8">Featured Products</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {allProduct.filter(d => d.category == 'featured')
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                    .slice(0, 4)
                    .map((product) => (

                        <div key={product._id}
                            className="bg-white py-2 rounded-lg shadow-lg hover:shadow-xl transition-shadow">

                            <div className='px-2'>
                                <img
                                    src={product.productImage}
                                    alt={product.productName}
                                    className="w-full h-48 md:h-40 object-cover rounded-md mb-4 "
                                />
                            </div>
                            <hr />


                            <Link to={`/products/${product._id}`}>
                                <h3
                                    className=" justify-center font-medium text-blue-600 cursor-pointer hover:text-green-600 hover:font-bold my-4 flex items-center gap-2"
                                >
                                    {product.productName} <FiExternalLink className="text-gray-400" />
                                </h3>
                            </Link>

                            <div className="my-3 flex  justify-center space-x-2 mb-4">
                                {product.tags.map((tag, index) => (
                                    <span key={index} className="bg-gray-200 text-gray-800 p-1 rounded-full text-xs">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* ---------buttons----------- */}
                            <div className='flex justify-end mr-4'>
                                {/* -----like------ */}
                                <UpVoteButton product={product} />
                            </div>


                        </div>
                    ))}
            </div>
        </section>
    );
};

export default FeaturedProducts;
