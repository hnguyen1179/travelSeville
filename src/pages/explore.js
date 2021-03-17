import React, { useState, useEffect, useRef } from 'react';

import { useSpring, animated } from 'react-spring';
import { interpolate } from 'flubber';
import { Transition, CSSTransition } from 'react-transition-group';
import { gsap } from 'gsap';

import Barrios from '../components/explore/barrios';
import Arquitectura from '../components/explore/arquitectura';
import Cultura from '../components/explore/cultura';
import Historia from '../components/explore/historia';

import '../styles/barrios.scss';
import '../styles/arquitectura.scss';
import '../styles/cultura.scss';
import '../styles/historia.scss';
import '../styles/explore.scss';

const Explore = () => {
  /* 
   * currentTab: Sets the current 'content' that is being mounted
   * lastTab: Used for svg morphing purposes
   * isMorphing: Trigger for morphing an svg into the next svg shape
   * contentMounted: Trigger for 'content' animation on mount and unmount
   * disableNext: Used as prop to disable 'next' button on 'content' components
   */
  const [currentTab, setCurrentTab] = useState(0);
  const [lastTab, setLastTab] = useState(3); 
  const [isMorphing, setIsMorphing] = useState(false);
  const [contentMounted, setContentMounted] = useState(true);
  const [disableNext, setDisableNext] = useState(false);
  // window is checked due to build time being ran on node
  const [width, setWidth] = useState(typeof window !== 'undefined' 
    ? window.innerWidth 
    : 0
  );
  const [height, setHeight] = useState(typeof window !== 'undefined' 
    ? window.innerHeight 
    : 0
  );

  const tabsRef = useRef();

  /* 
   * The main 'content' rendered is based on the 'currentTab', which indexes
   * this array to determine the shape of the svg being morphed 
   */
  const PATHS = [
    `M0 0 h${width} v250 h-${width} z`, // Barrios's svg
    `M0 340 h${width} v${height - 340} h-${width} z`, // Arquitectura's svg
    `M${width * 0.5} 0 h400 v${height * 0.8} h-400 z`, // Cultura's svg
    `M${width * 0.5 - 500} ${height * 0.15} h500 v${height - height * 0.15} 
      h-500 z`, // Historia's svg
  ];
  const ANIMATION_TIME = 1600;

  // Allows svg to be sized accordingly to the window's size
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      });
    }
  }, [])

  const nextPath = nextTabIndex => {
    if (currentTab !== nextTabIndex) {
      setDisableNext(true); // Disables the 'next' button
      setContentMounted(false); // Triggers an unmount of the 'content' div
      setIsMorphing(true); // Animates the svg to morph to the next svg shape

      tabsRef.current.childNodes.forEach(button => 
        button.setAttribute('disabled', 'disabled')
      )

      if (nextTabIndex === undefined) {
        // Clicked the 'next' button
        setLastTab(currentTab);
        setCurrentTab(previousTabIdx =>
          previousTabIdx + 1 >= PATHS.length ? 0 : previousTabIdx + 1
        );
      } else {
        // Clicked on a 'tab' button
        setLastTab(currentTab);
        setCurrentTab(nextTabIndex);
      }

      /*
       * This turns the svg into a static path after the animation is ran;
       * static path allows for the svg to be resized on window resizing. In 
       * addition, enables use of all buttons after animation is finished 
       */ 
      setTimeout(() => {
        setDisableNext(false);
        setIsMorphing(false);
        tabsRef.current.childNodes.forEach(button => 
          button.removeAttribute('disabled')
        );
      }, ANIMATION_TIME);
    }
  }

  const interpolator = interpolate(
    PATHS[lastTab],
    PATHS[currentTab] || PATHS[0],
    { maxSegmentLength: false }
  );

  // First half of svg's morph is interpolated on a component's unmount
  const firstHalf = useSpring({
    from: { t: 0 },
    to: { t: 0.5 },
    reset: true,
    config: { duration: 500 }
  });

  /* 
   * Second half of that same morph is interpolated to fit the new svg on 
   * the new componenet's mount 
   */
  const secondHalf = useSpring({
    from: { t: 0.5 },
    to: { t: 1 },
    reset: true,
    config: { duration: 500 }
  });

  const morphSvg = contentMounted 
    ? <animated.path d={secondHalf.t.interpolate(interpolator)} />
    : <animated.path d={firstHalf.t.interpolate(interpolator)} />;

  return (
    <div id="explore">
      <svg className="red-bar-svg">
        {/* 
          path element is a static svg in order to have resizing capability 
        */}
        {isMorphing ? morphSvg : <path d={PATHS[currentTab]} />}
      </svg>

      {/* 
        Main 'content' component is switched on a tab button click or a 'next' 
        button click. This triggers 'nextPath', which will update the state  
        accordingly to which button was clicked
      */}
      <div className="content">
        <CSSTransition
          classNames={"barrios-"}
          in={contentMounted && currentTab === 0}
          timeout={500}
          unmountOnExit
          onExited={() => setContentMounted(true)}
        >
          <Barrios nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          classNames={"arquitectura-"}
          in={contentMounted && currentTab === 1}
          timeout={500}
          unmountOnExit
          onExited={() => setContentMounted(true)}
        >
          <Arquitectura nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          classNames={"cultura-"}
          in={contentMounted && currentTab === 2}
          timeout={500}
          unmountOnExit
          onExited={() => setContentMounted(true)}
        >
          <Cultura nextPath={nextPath} disableNext={disableNext} />
        </CSSTransition>

        <CSSTransition
          classNames={"historia-"}
          in={contentMounted && currentTab === 3}
          timeout={500}
          unmountOnExit
          onExited={() => setContentMounted(true)}
        >
          <Historia disableNext={disableNext} />
        </CSSTransition>
      </div>

      {/* 
        Tabs are displayed at the top of the page to navigate between components  
      */}
      <div className="tabs" ref={tabsRef}>
        {/* 
          First tab is displayed by default; no transitions necessary
        */}
        <button className="tabs-barrios" onClick={() => nextPath(0)}> 
          Barrios 
        </button>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to('.tabs-arquitectura', { visibility: 'visible', opacity: 1 })
          }}
          in={currentTab === 1}
        >
          <button className="tabs-arquitectura" onClick={() => nextPath(1)}> 
            Arquitectura 
          </button>
        </Transition>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to('.tabs-cultura', { visibility: 'visible', opacity: 1 })
          }}
          in={currentTab === 2}
        >
          <button className="tabs-cultura" onClick={() => nextPath(2)}> 
            Cultura 
          </button>
        </Transition>

        <Transition
          timeout={1000}
          onEnter={() => {
            gsap.to('.tabs-historia', { visibility: 'visible', opacity: 1 })
          }}
          in={currentTab === 3}
        >
          <button className="tabs-historia" onClick={() => nextPath(3)}> 
            Historia 
          </button>
        </Transition>
      </div>
    </div>
  );
}

export default Explore;