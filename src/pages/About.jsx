function About() {
    return (
        <div className="container">
            <h1 className="text-6xl mb-4">GitHub Finder</h1>
            <p className='mb-4 text-2xl font-light'>
                GitHub Finder is a web application to search GitHub users and display their info. <br />
                It's a hands-on project I developed while self-learning the course 
                <strong>
                    <a href='https://www.udemy.com/course/react-front-to-back-2022' target="_blank">
                    {' '}
                    React Front To Back
                    </a>{' '}
                </strong>
                by Brad Traversy on Udemy.
            </p>

            <p className='text-lg text-gray-400'>
                Version <span className='text-white'>1.0.0</span>
            </p>

        </div>
    )
}

export default About
