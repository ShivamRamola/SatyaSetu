// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initPreloader();
    initNavigation();
    initStickyHeader();
    initThemeToggle();
    initDemoTabs();
    initDemoFunctionality();
    initBackToTop();
});

/**
 * Initialize preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

/**
 * Initialize navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // If mobile menu is open, close it
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
            }
            
            // If link points to an ID on the page, smooth scroll to it
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList.classList.contains('active') && 
            !e.target.closest('.nav-list') && 
            !e.target.closest('.mobile-menu-toggle')) {
            navList.classList.remove('active');
        }
    });
    
    // Update active menu item based on scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Initialize sticky header
 */
function initStickyHeader() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
}

/**
 * Initialize theme toggle
 */
function initThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check if theme is stored in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeSwitch.checked = false;
    }
    
    // Toggle theme when switch is clicked
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        }
    });
}

/**
 * Initialize demo tabs
 */
function initDemoTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked button and corresponding tab
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Initialize demo functionality
 */
function initDemoFunctionality() {
    // Text analyzer demo
    const textAnalyzerDemo = () => {
        const textArea = document.querySelector('#text-demo textarea');
        const analyzeBtn = document.querySelector('#text-demo .demo-btn');
        const progressFill = document.querySelector('#text-demo .progress-fill');
        const progressLabel = document.querySelector('#text-demo .progress-label');
        const humanProb = document.querySelector('#text-demo .metric:nth-child(1) .metric-value');
        const aiProb = document.querySelector('#text-demo .metric:nth-child(2) .metric-value');
        const confidence = document.querySelector('#text-demo .metric:nth-child(3) .metric-value');
        const explanation = document.querySelector('#text-demo .result-explanation');
        
        if (!analyzeBtn) return;
        
        analyzeBtn.addEventListener('click', () => {
            const text = textArea.value.trim();
            
            if (text.length < 50) {
                alert('Please enter at least 50 characters to analyze.');
                return;
            }
            
            // Simulate analysis
            progressLabel.textContent = 'Analyzing...';
            let progress = 0;
            
            const interval = setInterval(() => {
                progress += 2;
                progressFill.style.width = `${progress}%`;
                
                if (progress >= 100) {
                    clearInterval(interval);
                    progressLabel.textContent = 'Analysis Complete';
                    
                    // Show fake results based on text length (just for demo)
                    const textWords = text.split(' ').length;
                    const randomFactor = Math.random() * 0.2; // Add some randomness
                    const isAI = textWords > 100 ? 0.7 + randomFactor : 0.3 + randomFactor;
                    const isHuman = 1 - isAI;
                    const confidenceValue = 0.75 + (Math.random() * 0.2);
                    
                    humanProb.textContent = `${(isHuman * 100).toFixed(1)}%`;
                    aiProb.textContent = `${(isAI * 100).toFixed(1)}%`;
                    confidence.textContent = `${(confidenceValue * 100).toFixed(1)}%`;
                    
                    if (isAI > 0.5) {
                        explanation.textContent = 'This text shows patterns consistent with AI-generated content. The analysis detected repetitive structures and predictable word choices typical of language models.';
                    } else {
                        explanation.textContent = 'This text exhibits characteristics consistent with human-written content. It contains natural flow, varied sentence structures, and unpredictable word choices.';
                    }
                }
            }, 30);
        });
    };
    
    // Image upload demo
    const imageUploadDemo = () => {
        const uploadArea = document.querySelector('.image-upload-area');
        const fileInput = document.querySelector('.image-upload-area input[type="file"]');
        const verifyBtn = document.querySelector('#image-demo .demo-btn');
        const resultArea = document.querySelector('.image-result-area');
        
        if (!uploadArea || !fileInput) return;
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleImageUpload(this.files[0]);
            }
        });
        
        // Handle drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-blue)';
            uploadArea.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
            
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleImageUpload(e.dataTransfer.files[0]);
            }
        });
        
        // Handle clicking on the upload area
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        function handleImageUpload(file) {
            if (!file.type.match('image.*')) {
                alert('Please upload an image file');
                return;
            }
            
            // Display the selected image
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" style="max-height: 180px; max-width: 100%; border-radius: 5px;">
                    <p style="margin-top: 10px;">Image selected</p>
                `;
                
                // Enable the verify button
                verifyBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        }
        
        // Handle verify button click
        verifyBtn.addEventListener('click', () => {
            resultArea.innerHTML = `
                <div style="width: 100%;">
                    <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <div style="background: var(--accent-blue); color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                                <i class="fas fa-info"></i>
                            </div>
                            <h3 style="margin: 0; font-size: 1.1rem;">Analysis Result</h3>
                        </div>
                        <p style="margin: 0; font-size: 0.95rem;">This is a simulated demo. In a real application, the AI would analyze the image for signs of manipulation, generated content, or other forms of deception.</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                        <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                            <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Manipulation Score</h4>
                            <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                <div style="height: 100%; width: 25%; background: var(--accent-green); border-radius: 3px;"></div>
                            </div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Low (25%)</p>
                        </div>
                        <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                            <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">AI Generated Score</h4>
                            <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                <div style="height: 100%; width: 15%; background: var(--accent-green); border-radius: 3px;"></div>
                            </div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very Low (15%)</p>
                        </div>
                    </div>
                    
                    <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                        <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Conclusion</h4>
                        <p style="margin: 0; font-size: 0.95rem;">This image appears to be authentic with a high degree of confidence. No signs of digital manipulation or AI generation were detected.</p>
                    </div>
                </div>
            `;
        });
    };
    
    // Video upload demo
    const videoUploadDemo = () => {
        const uploadArea = document.querySelector('.video-upload-area');
        const fileInput = document.querySelector('.video-upload-area input[type="file"]');
        const analyzeBtn = document.querySelector('#video-demo .demo-btn');
        const resultArea = document.querySelector('.video-result-area');
        
        if (!uploadArea || !fileInput) return;
        
        // Handle file selection
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                handleVideoUpload(this.files[0]);
            }
        });
        
        // Handle drag and drop
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--accent-blue)';
            uploadArea.style.backgroundColor = 'rgba(59, 130, 246, 0.05)';
        });
        
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
        });
        
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--border-color)';
            uploadArea.style.backgroundColor = '';
            
            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                handleVideoUpload(e.dataTransfer.files[0]);
            }
        });
        
        // Handle clicking on the upload area
        uploadArea.addEventListener('click', () => {
            fileInput.click();
        });
        
        function handleVideoUpload(file) {
            if (!file.type.match('video.*')) {
                alert('Please upload a video file');
                return;
            }
            
            // Display the selected video
            uploadArea.innerHTML = `
                <div style="width: 100%; max-width: 300px;">
                    <video width="100%" height="auto" controls style="border-radius: 5px;">
                        <source src="${URL.createObjectURL(file)}" type="${file.type}">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p style="margin-top: 10px;">Video selected</p>
            `;
            
            // Enable the analyze button
            analyzeBtn.disabled = false;
        }
        
        // Handle analyze button click
        analyzeBtn.addEventListener('click', () => {
            resultArea.innerHTML = `
                <div style="width: 100%;">
                    <div style="background: rgba(59, 130, 246, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; align-items: center; margin-bottom: 10px;">
                            <div style="background: var(--accent-blue); color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                                <i class="fas fa-info"></i>
                            </div>
                            <h3 style="margin: 0; font-size: 1.1rem;">Analysis Result</h3>
                        </div>
                        <p style="margin: 0; font-size: 0.95rem;">This is a simulated demo. In a real application, the AI would analyze the video for signs of manipulation, splicing, or deepfake content.</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px;">
                        <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                            <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Manipulation Score</h4>
                            <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                <div style="height: 100%; width: 15%; background: var(--accent-green); border-radius: 3px;"></div>
                            </div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very Low (15%)</p>
                        </div>
                        <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                            <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Deepfake Score</h4>
                            <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                <div style="height: 100%; width: 10%; background: var(--accent-green); border-radius: 3px;"></div>
                            </div>
                            <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very Low (10%)</p>
                        </div>
                    </div>
                    
                    <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                        <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Conclusion</h4>
                        <p style="margin: 0; font-size: 0.95rem;">This video appears to be authentic with a high degree of confidence. No significant signs of digital manipulation, splicing, or deepfake content were detected.</p>
                    </div>
                </div>
            `;
        });
    };
    
    // Deepfake demo
    const deepfakeDemo = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const resultArea = document.querySelector('.deepfake-result-area');
        
        if (!galleryItems.length) return;
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                // Apply selected style
                galleryItems.forEach(i => i.style.border = 'none');
                item.style.border = '2px solid var(--accent-blue)';
                
                // Get the result type
                const result = item.getAttribute('data-result');
                
                // Show the appropriate result
                if (result === 'fake') {
                    resultArea.innerHTML = `
                        <div style="width: 100%;">
                            <div style="background: rgba(236, 72, 153, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <div style="background: var(--accent-pink); color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                                        <i class="fas fa-exclamation-triangle"></i>
                                    </div>
                                    <h3 style="margin: 0; font-size: 1.1rem;">Likely AI-Generated Content Detected</h3>
                                </div>
                                <p style="margin: 0; font-size: 0.95rem;">Our system has detected characteristics consistent with AI-generated or manipulated content.</p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Deepfake Score</h4>
                                    <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                        <div style="height: 100%; width: 85%; background: var(--accent-pink); border-radius: 3px;"></div>
                                    </div>
                                    <p style="margin: 0; font-size: 0.9rem; color: var(--accent-pink);">High (85%)</p>
                                </div>
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Confidence</h4>
                                    <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                        <div style="height: 100%; width: 90%; background: var(--accent-green); border-radius: 3px;"></div>
                                    </div>
                                    <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very High (90%)</p>
                                </div>
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Processing Time</h4>
                                    <p style="margin: 0; font-size: 1.2rem; font-weight: 500; color: var(--text-primary);">0.42s</p>
                                </div>
                            </div>
                            
                            <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Detected Issues</h4>
                                <ul style="margin: 0; padding-left: 20px; font-size: 0.95rem;">
                                    <li>Inconsistent facial features detected</li>
                                    <li>Unnatural lighting and shadows</li>
                                    <li>Artifacts around facial boundaries</li>
                                    <li>Irregular texture patterns</li>
                                </ul>
                            </div>
                        </div>
                    `;
                } else {
                    resultArea.innerHTML = `
                        <div style="width: 100%;">
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 15px;">
                                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                                    <div style="background: var(--accent-green); color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; margin-right: 10px;">
                                        <i class="fas fa-check"></i>
                                    </div>
                                    <h3 style="margin: 0; font-size: 1.1rem;">Likely Authentic Content</h3>
                                </div>
                                <p style="margin: 0; font-size: 0.95rem;">Our system has not detected significant signs of AI-generation or manipulation in this content.</p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px;">
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Deepfake Score</h4>
                                    <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                        <div style="height: 100%; width: 12%; background: var(--accent-green); border-radius: 3px;"></div>
                                    </div>
                                    <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very Low (12%)</p>
                                </div>
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Confidence</h4>
                                    <div style="height: 5px; background: rgba(107, 114, 128, 0.2); border-radius: 3px; margin-bottom: 10px;">
                                        <div style="height: 100%; width: 95%; background: var(--accent-green); border-radius: 3px;"></div>
                                    </div>
                                    <p style="margin: 0; font-size: 0.9rem; color: var(--accent-green);">Very High (95%)</p>
                                </div>
                                <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                    <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Processing Time</h4>
                                    <p style="margin: 0; font-size: 1.2rem; font-weight: 500; color: var(--text-primary);">0.38s</p>
                                </div>
                            </div>
                            
                            <div style="background: var(--card-bg); padding: 15px; border-radius: 10px; border: 1px solid var(--border-color);">
                                <h4 style="margin-top: 0; margin-bottom: 10px; font-size: 1rem;">Analysis Summary</h4>
                                <p style="margin: 0; font-size: 0.95rem;">No significant indicators of manipulation were detected in this content. The facial features, lighting, and textures are consistent with authentic imagery.</p>
                            </div>
                        </div>
                    `;
                }
            });
        });
    };
    
    // Initialize all demos
    textAnalyzerDemo();
    imageUploadDemo();
    videoUploadDemo();
    deepfakeDemo();
}

/**
 * Initialize back to top button
 */
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}