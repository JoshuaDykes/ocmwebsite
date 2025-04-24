/**
 * Overcomers Caring Ministries - Main JavaScript File
 * This file contains all the JavaScript functionality for the OCM website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Apply animation classes on page load
    setTimeout(function() {
        applyAnimationClasses();
    }, 100);
    
    // Apply animation classes on scroll
    window.addEventListener('scroll', function() {
        applyAnimationClasses();
    });
    
    // Function to add animation classes to elements
    function applyAnimationClasses() {
        // Elements to animate
        const animateElements = document.querySelectorAll(
            '.stat-item, .news-item, .testimonial-item, .section-header, .featured-story, .donation-appeal, .info-card'
        );
        
        animateElements.forEach(el => {
            if (isElementInViewport(el) && !el.classList.contains('animated')) {
                // Add animation class based on element type
                if (el.classList.contains('stat-item')) {
                    el.classList.add('scale-in', 'animated');
                    el.style.animationDelay = (Array.from(el.parentNode.children).indexOf(el) * 0.1) + 's';
                } else if (el.classList.contains('news-item')) {
                    el.classList.add('slide-up', 'animated');
                    el.style.animationDelay = (Array.from(el.parentNode.children).indexOf(el) * 0.1) + 's';
                } else if (el.classList.contains('testimonial-item')) {
                    el.classList.add('fade-in', 'animated');
                    el.style.animationDelay = (Array.from(el.parentNode.children).indexOf(el) * 0.1) + 's';
                } else if (el.classList.contains('section-header')) {
                    el.classList.add('slide-up', 'animated');
                } else if (el.classList.contains('featured-story')) {
                    el.classList.add('fade-in', 'animated');
                } else if (el.classList.contains('donation-appeal')) {
                    el.classList.add('fade-in', 'animated');
                } else if (el.classList.contains('info-card')) {
                    el.classList.add('slide-up', 'animated');
                    el.style.animationDelay = (Array.from(el.parentNode.children).indexOf(el) * 0.1) + 's';
                }
            }
        });
        
        // Animate hero content if exists
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && !heroContent.classList.contains('animated')) {
            heroContent.classList.add('fade-in', 'animated');
        }
    }
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('open');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Statistics counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateStats() {
        if (counted) return;
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const speed = 200; // Lower is faster
            const inc = target / speed;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + inc);
                setTimeout(animateStats, 1);
            } else {
                stat.innerText = target;
            }
        });
        
        counted = true;
    }
    
    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0 &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
            rect.right >= 0
        );
    }
    
    // Start animation when stats section is in viewport
    const statsSection = document.querySelector('.impact-stats');
    
    if (statsSection) {
        window.addEventListener('scroll', function() {
            if (isElementInViewport(statsSection) && !counted) {
                animateStats();
            }
        });
    }
    
    // News Carousel
    const newsCarousel = document.querySelector('.news-carousel');
    const newsItems = document.querySelectorAll('.news-item');
    const prevButton = document.querySelector('.news-carousel + .carousel-controls .prev-button');
    const nextButton = document.querySelector('.news-carousel + .carousel-controls .next-button');
    
    let newsCurrentIndex = 0;
    let newsItemWidth = 0;
    
    if (newsCarousel && newsItems.length > 0) {
        // Initialize carousel for mobile (show only one item)
        function initNewsCarousel() {
            if (window.innerWidth <= 768) {
                newsItemWidth = newsCarousel.offsetWidth;
                
                newsItems.forEach(item => {
                    item.style.width = newsItemWidth + 'px';
                });
                
                newsCarousel.style.display = 'flex';
                newsCarousel.style.overflow = 'hidden';
                newsCarousel.style.scrollBehavior = 'smooth';
                
                updateNewsCarousel();
            } else {
                // Reset for desktop
                newsItems.forEach(item => {
                    item.style.width = '';
                });
                
                newsCarousel.style.display = 'grid';
                newsCarousel.style.transform = 'translateX(0)';
            }
        }
        
        function updateNewsCarousel() {
            if (window.innerWidth <= 768) {
                newsCarousel.style.transform = `translateX(-${newsCurrentIndex * newsItemWidth}px)`;
            }
        }
        
        // Buttons for news carousel
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    newsCurrentIndex = (newsCurrentIndex > 0) ? newsCurrentIndex - 1 : newsItems.length - 1;
                    updateNewsCarousel();
                }
            });
            
            nextButton.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    newsCurrentIndex = (newsCurrentIndex < newsItems.length - 1) ? newsCurrentIndex + 1 : 0;
                    updateNewsCarousel();
                }
            });
        }
        
        // Initialize on load and resize
        initNewsCarousel();
        window.addEventListener('resize', initNewsCarousel);
    }
    
    // Testimonials Carousel
    const testimonialCarousel = document.querySelector('.testimonials-carousel');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const testimonialPrevButton = document.querySelector('.testimonials-carousel + .carousel-controls .prev-button');
    const testimonialNextButton = document.querySelector('.testimonials-carousel + .carousel-controls .next-button');
    
    let testimonialCurrentIndex = 0;
    let testimonialItemWidth = 0;
    
    if (testimonialCarousel && testimonialItems.length > 0) {
        // Initialize carousel
        function initTestimonialCarousel() {
            if (window.innerWidth <= 992) {
                testimonialItemWidth = testimonialCarousel.offsetWidth;
                
                testimonialItems.forEach(item => {
                    item.style.width = testimonialItemWidth + 'px';
                });
                
                testimonialCarousel.style.display = 'flex';
                testimonialCarousel.style.overflow = 'hidden';
                testimonialCarousel.style.scrollBehavior = 'smooth';
                
                updateTestimonialCarousel();
            } else {
                // Reset for desktop
                testimonialItems.forEach(item => {
                    item.style.width = '';
                });
                
                testimonialCarousel.style.display = 'grid';
                testimonialCarousel.style.transform = 'translateX(0)';
            }
        }
        
        function updateTestimonialCarousel() {
            if (window.innerWidth <= 992) {
                testimonialCarousel.style.transform = `translateX(-${testimonialCurrentIndex * testimonialItemWidth}px)`;
            }
        }
        
        // Buttons for testimonial carousel
        if (testimonialPrevButton && testimonialNextButton) {
            testimonialPrevButton.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    testimonialCurrentIndex = (testimonialCurrentIndex > 0) ? testimonialCurrentIndex - 1 : testimonialItems.length - 1;
                    updateTestimonialCarousel();
                }
            });
            
            testimonialNextButton.addEventListener('click', function() {
                if (window.innerWidth <= 992) {
                    testimonialCurrentIndex = (testimonialCurrentIndex < testimonialItems.length - 1) ? testimonialCurrentIndex + 1 : 0;
                    updateTestimonialCarousel();
                }
            });
        }
        
        // Initialize on load and resize
        initTestimonialCarousel();
        window.addEventListener('resize', initTestimonialCarousel);
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Mock API call for newsletter signup
                // In a real application, you would send this to your backend
                console.log('Newsletter signup for:', email);
                
                // Show success message
                const formParent = newsletterForm.parentNode;
                formParent.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><p>Thank you for subscribing to our newsletter!</p></div>';
            } else {
                // Add error class to input
                emailInput.classList.add('error');
                
                // Remove error class after 3 seconds
                setTimeout(function() {
                    emailInput.classList.remove('error');
                }, 3000);
            }
        });
    }
    
    // Email validation helper function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (nav.classList.contains('open')) {
                        nav.classList.remove('open');
                        mobileMenuToggle.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // Video player functionality
    const videoContainer = document.querySelector('.video-container');
    const video = videoContainer?.querySelector('video');
    
    if (video) {
        // Add hover effect for desktop
        if (window.innerWidth > 768) {
            video.addEventListener('mouseover', function() {
                if (video.paused) {
                    // Only show controls on hover if paused
                    video.setAttribute('controls', '');
                }
            });
            
            video.addEventListener('mouseout', function() {
                if (video.paused) {
                    // Hide controls on mouse out if paused
                    video.removeAttribute('controls');
                }
            });
        }
        
        // Play video when it comes into view
        window.addEventListener('scroll', function() {
            if (isElementInViewport(videoContainer)) {
                if (video.paused && localStorage.getItem('videoAutoplayDisabled') !== 'true') {
                    // Only attempt autoplay if not explicitly disabled by user
                    const playPromise = video.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Auto-play was prevented, likely due to browser policies
                            console.log('Autoplay prevented:', error);
                            // Mark this preference for future reference
                            localStorage.setItem('videoAutoplayDisabled', 'true');
                        });
                    }
                }
            } else {
                // Pause video when out of view
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }
}); 