import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import type { Product } from '../data/products';
import './FlowingProductItem.css';

export default function FlowingProductItem({ product }: { product: Product }) {
  const isLive = product.status === 'live';
  const itemRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);
  const [repetitions, setRepetitions] = useState(4);
  const speed = 10;

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  const findClosestEdge = (mouseX: number, mouseY: number, width: number, height: number) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  useEffect(() => {
    const calculateRepetitions = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };

    calculateRepetitions();
    window.addEventListener('resize', calculateRepetitions);
    return () => window.removeEventListener('resize', calculateRepetitions);
  }, [product.name]);

  useEffect(() => {
    const setupMarquee = () => {
      if (!marqueeInnerRef.current) return;
      const marqueeContent = marqueeInnerRef.current.querySelector('.marquee__part') as HTMLElement;
      if (!marqueeContent) return;
      const contentWidth = marqueeContent.offsetWidth;
      if (contentWidth === 0) return;

      if (animationRef.current) {
        animationRef.current.kill();
      }

      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: 'none',
        repeat: -1
      });
    };

    const timer = setTimeout(setupMarquee, 50);
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [product.name, repetitions, speed]);

  const handleMouseEnter = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' }, 0);
  };

  const handleMouseLeave = (ev: any) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }, 0)
      .to(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' }, 0);
  };

  const Tag = isLive ? 'a' : 'div';

  return (
    <Tag 
      className={`accordion-panel reveal-on-scroll ${!isLive ? 'soon' : ''}`}
      href={isLive ? product.href : undefined}
      style={{ 
        '--accent-color': `var(--${product.accentColor})`, 
        overflow: 'hidden', 
        cursor: isLive ? 'pointer' : 'default', 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'block',
        padding: 0
      } as any}
      ref={itemRef as any}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="wrap accordion-panel-inner">
        <div className="panel-title">
          <div className="panel-icon" dangerouslySetInnerHTML={{ __html: product.svgIcon }}></div>
          <h3>{product.name}</h3>
        </div>
        
        <div className="panel-desc">
          {product.description}
        </div>

        <div className="panel-meta">
          <span className="status">{isLive ? 'Live' : 'In Development'}</span>
          <span className="tag">{product.tag}</span>
          {isLive && <div className="cta-arrow">→</div>}
        </div>
      </div>

      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: `var(--${product.accentColor})` }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {[...Array(repetitions)].map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: 'var(--bg-panel)' }}>
                <span>{product.name}</span>
                <div className="marquee__icon" style={{ color: 'var(--bg-panel)' }} dangerouslySetInnerHTML={{ __html: product.svgIcon }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Tag>
  );
}
