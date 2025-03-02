// VimDoc Reader - Essential functionality
document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const helpModal = document.getElementById('help-modal');
    const helpContent = document.getElementById('help-content');
    const helpCommands = document.querySelectorAll('.help-command');
    const helpPosition = document.getElementById('help-position');
    
    // State variables
    let isHelpVisible = false;
    let currentHelpIndex = 0;
    let scrollPosition = 0;
    const scrollStep = 50;
    
    // Show help modal
    function showHelp() {
        helpModal.classList.remove('hidden');
        isHelpVisible = true;
        currentHelpIndex = 0;
        scrollPosition = 0;
        helpContent.scrollTop = 0;
        updateHighlight();
    }
    
    // Hide help modal
    function hideHelp() {
        helpModal.classList.add('hidden');
        isHelpVisible = false;
    }
    
    // Update highlighted command
    function updateHighlight() {
        // Remove highlighting from all commands
        helpCommands.forEach(cmd => {
            cmd.classList.remove('highlight');
        });
        
        // If there are commands, highlight the current one
        if (helpCommands.length > 0) {
            // Calculate visible commands based on scroll position
            const visibleCommands = Array.from(helpCommands).filter(cmd => {
                const rect = cmd.getBoundingClientRect();
                const helpRect = helpContent.getBoundingClientRect();
                return rect.top >= helpRect.top && rect.bottom <= helpRect.bottom;
            });
            
            // If there are visible commands, highlight one based on current index
            if (visibleCommands.length > 0) {
                const highlightIndex = Math.min(currentHelpIndex, visibleCommands.length - 1);
                visibleCommands[highlightIndex].classList.add('highlight');
            }
        }
    }
    
    // Scroll help content
    function scrollHelp(direction) {
        if (direction === 'down') {
            scrollPosition += scrollStep;
        } else if (direction === 'up') {
            scrollPosition = Math.max(0, scrollPosition - scrollStep);
        }
        
        helpContent.scrollTop = scrollPosition;
        updateHighlight();
    }
    
    // Handle keyboard events
    document.addEventListener('keydown', function(e) {
        if (isHelpVisible) {
            // Help modal navigation
            if (e.key === 'j') {
                e.preventDefault();
                scrollHelp('down');
            } else if (e.key === 'k') {
                e.preventDefault();
                scrollHelp('up');
            } else if (e.key === 'q' || e.key === 'Escape') {
                e.preventDefault();
                hideHelp();
            }
        } else {
            // Main screen navigation
            if (e.key === '?') {
                e.preventDefault();
                showHelp();
            }
        }
    });
    
    // Close help modal when clicking outside of content
    helpModal.addEventListener('click', function(e) {
        if (e.target === helpModal) {
            hideHelp();
        }
    });
    
    // Make help content scrollable
    helpContent.addEventListener('scroll', function() {
        scrollPosition = helpContent.scrollTop;
        updateHighlight();
    });
    
    // Initialize with modal hidden
    hideHelp();
    
    // Add VIM-style cursor blinking
    setInterval(function() {
        const cursors = document.querySelectorAll('.cursor');
        cursors.forEach(cursor => {
            cursor.style.visibility = cursor.style.visibility === 'hidden' ? 'visible' : 'hidden';
        });
    }, 530); // Blinking rate
});
