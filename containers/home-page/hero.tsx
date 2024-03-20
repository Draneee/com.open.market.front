const Hero = () => {
  return (
    <section className='mt-8 mb-2 lg:my-6 flex max-lg:flex-col-reverse items-center gap-4 lg:gap-10'>
      <img
        className='size-64'
        src='https://res.cloudinary.com/dynscts1t/image/upload/v1710729245/Frame_1_cadxwf.svg'
        alt='Doodle Unboxing Image'
      />
      <section>
        <h1 className='text-5xl sm:text-6xl font-medium text-center'>
          Welcome to <br />
          <span className='before:block before:absolute before:-inset-1 before:-skew-y-1 before:bg-black relative inline-block'>
            <span className='relative text-white'>Open Market</span>
          </span>
        </h1>

        <h2 className='mt-1.5 text-md text-center sm:text-[1.15rem] font-medium'>
          Your Ultimate Marketplace Destination
        </h2>
      </section>
    </section>
  );
};

export default Hero;
