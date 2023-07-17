import TestButton from './components/TestButton'
export default function AboutPage() {

  return (
    <div>
      <h1 className='text-4xl mb-4'>Palette Test Page</h1>
      <p>Check out the changes in dark mode!</p>
      <br />
      <figure className='my-8'>
        <img className='w-2/3 mx-auto' src='/palette.jpg' />
        <figcaption className='text-sm text-center'>Main UI Palette</figcaption>
      </figure>
      <figure className='my-8'>
        <img className=' w-2/3 mx-auto' src='/InteractivePalettes.png' />
        <figcaption className='text-sm text-center'>Interactive Element Palette</figcaption>
      </figure>
      <div className='flex flex-row justify-evenly my-8'>
        <div>
        <TestButton />
        <div className='text-sm'>Toggle button with animations</div>
        </div>
        <br />
        <div>
          <p className="text-xl text-standard-confirm dark:text-standard-darkconfirm">Entry updated!</p>
          <p className="text-xl text-standard-warn dark:text-standard-darkwarn">This could break something.</p>
          <p className="text-xl text-standard-delete dark:text-standard-darkdelete">Entry removed.</p>
        </div>
      </div>
      <p className="text-3xl dark:text-standard-100 text-standard-900">Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa veritatis consectetur at cumque quis cupiditate magnam aliquid, non mollitia, ea repellat perspiciatis quaerat assumenda amet officia tempore recusandae maiores labore Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis asperiores hic cupiditate adipisci id commodi porro, quod laudantium harum molestiae assumenda perspiciatis maiores quo autem nulla officiis saepe repellendus natus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis ut ab magnam, dignissimos veniam dolores, labore perspiciatis iste, totam impedit obcaecati laborum atque soluta deserunt nemo. Perspiciatis sunt nemo earum! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo accusamus corporis repudiandae voluptatem tempora cumque magni reiciendis velit optio, neque quam nihil ea eligendi ut vel, alias, non repellat voluptatibus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis neque quae libero consequuntur ducimus. Maiores sapiente nulla eum possimus nisi molestias numquam. Ipsa laborum quibusdam reprehenderit iure natus dicta nulla?</p>
    </div>
  )
}
