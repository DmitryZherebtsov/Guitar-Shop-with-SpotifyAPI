import React from 'react'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Marcus Reyes',
    role: 'Touring guitarist',
    quote: 'The Custom Shop PSL ’68 I bought here plays better than anything I\'ve owned. The customization process was smooth from start to finish.',
    rating: 5
  },
  {
    name: 'Elena Kovac',
    role: 'Session musician',
    quote: 'Fast shipping, honest descriptions, and the guitar arrived exactly as pictured. Les Paul Garage is now my go-to shop.',
    rating: 5
  },
  {
    name: 'Tom Baxter',
    role: 'Home studio owner',
    quote: 'Great selection for every budget. The team helped me pick the right pickups for the sound I was going for.',
    rating: 4
  }
]

const Stars = ({ count }) => (
  <div className='stars' aria-label={`${count} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < count ? 'star filled' : 'star'}>★</span>
    ))}
  </div>
)

const Testimonials = () => {
  return (
    <div className='testimonials'>
      <h1>What Guitarists Say<span className='dot'>.</span></h1>

      <div className='testimonials_grid'>
        {testimonials.map(item => (
          <div className='testimonial_card' key={item.name}>
            <Stars count={item.rating} />
            <p className='testimonial_quote'>“{item.quote}”</p>
            <p className='testimonial_author'>{item.name}</p>
            <p className='testimonial_role'>{item.role}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials
