'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { FaBeer } from 'react-icons/fa'
import PopIn from '@/app/utils/popIn'
import { useTheme } from 'next-themes'

export default function Timeline() {
    const {theme} = useTheme()
    const [mounted, setMounted] = useState(false)
    
    // Default behavior causes page refreshes in light mode to have invisible
    // text. There's likely a more elegant solution here but this works for now
    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    const testIcon = {
        icon: <FaBeer />,
        iconStyle: {
            background: '#27241D',
            color: '#E8E6E1',
        }
    }

    const timeline = [
        {
            title: 'test1',
            subtitle: 'Maryland',
            date: '2011-2014',
            desc: 'test number 1',
            icon: testIcon,
        },
        {
            title: 'test2',
            subtitle: 'Florida',
            date: '2014-2016',
            desc: 'test number 2',
            icon: testIcon,
        },
        {
            title: 'test3',
            subtitle: 'Milwaukee',
            date: '2016-Present',
            desc: 'test number 3',
            icon: testIcon,
        }
    ]

    return(
            <VerticalTimeline
            lineColor={theme === 'light' ? '#27241D' : '#E8E6E1'}
            layout='1-column-left'
            className=''
            >
                {timeline.map((t, i) => {
                    // Background colors for the main element can only be controlled at the top level,
                    // this is a workaround that invokes the active theme
                    const contentStyle = (theme == 'light') ?
                    {background: '#27241D',} : {background: '#E8E6E1',}
                
                    return (
                        <PopIn
                        className='my-8 drop-shadow-lg'
                        key={i}>
                        <VerticalTimelineElement
                            key={i}
                            // Tailwind classes outside of bg can be used here.
                            className='text-standard-100 dark:text-standard-900'
                            contentStyle={contentStyle}
                            date={t.date}
                            {...t.icon}
                            visible={true}

                        >
                        {t.title ? (
                            <React.Fragment>
                            <h3 className="text-xl">{t.title}</h3>
                            {t.subtitle && (
                            <h4 className="">
                                {t.subtitle}
                            </h4>
                            )}
                            {t.desc && <p>{t.desc}</p>}
                            </React.Fragment>
                        ): undefined}
                        </VerticalTimelineElement>
                        </PopIn>
                    )
                })}
            </VerticalTimeline>
    )
}