/**
 * Simon Board Component
 * 
 * Displays the 4 color buttons in a 2x2 grid.
 * Handles sequence animation and player input.
 */

import { useState, useEffect } from 'react';
import type { Color } from '../../shared/types';

// =============================================================================
// TYPES
// =============================================================================

interface SimonBoardProps {
  sequence: Color[];
  round: number;
  isShowingSequence: boolean;
  isInputPhase: boolean;
  playerSequence: Color[];
  canSubmit: boolean;
  lastResult: { isCorrect: boolean; playerName: string } | null;
  onColorClick: (color: Color) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

interface ColorButtonProps {
  color: Color;
  isActive: boolean;
  onClick: () => void;
  disabled: boolean;
}

// =============================================================================
// COLOR BUTTON COMPONENT
// =============================================================================

const ColorButton: React.FC<ColorButtonProps> = ({ color, isActive, onClick, disabled }) => {
  // Base color classes
  const colorClasses: Record<Color, string> = {
    red: 'bg-red-500 hover:bg-red-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    yellow: 'bg-yellow-400 hover:bg-yellow-500',
    green: 'bg-green-500 hover:bg-green-600',
  };
  
  // Active state classes (brighter)
  const activeClasses: Record<Color, string> = {
    red: 'bg-red-300 brightness-150 scale-110',
    blue: 'bg-blue-300 brightness-150 scale-110',
    yellow: 'bg-yellow-200 brightness-150 scale-110',
    green: 'bg-green-300 brightness-150 scale-110',
  };
  
  const baseClass = colorClasses[color];
  const activeClass = activeClasses[color];
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-40 h-40 rounded-2xl 
        transition-all duration-200 
        shadow-lg
        ${isActive ? activeClass : baseClass}
        ${disabled ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
      `}
      aria-label={`${color} button`}
    >
      <span className="sr-only">{color}</span>
    </button>
  );
};

// =============================================================================
// SIMON BOARD COMPONENT
// =============================================================================

export const SimonBoard: React.FC<SimonBoardProps> = ({
  sequence,
  round,
  isShowingSequence,
  isInputPhase,
  playerSequence,
  canSubmit,
  lastResult,
  onColorClick,
  onSubmit,
  disabled = false,
}) => {
  const [activeColor, setActiveColor] = useState<Color | null>(null);
  const [animationIndex, setAnimationIndex] = useState<number>(0);
  
  // Animate sequence when showing
  useEffect(() => {
    if (!isShowingSequence || sequence.length === 0) {
      setActiveColor(null);
      setAnimationIndex(0);
      return;
    }
    
    // Animation constants (matching backend)
    const SHOW_DURATION = 1000; // 1 second per color
    const SHOW_GAP = 200; // 200ms gap between colors
    
    let currentIndex = 0;
    let timeoutId: number;
    
    const showNextColor = () => {
      if (currentIndex >= sequence.length) {
        // Animation complete
        setActiveColor(null);
        return;
      }
      
      const color = sequence[currentIndex];
      
      // Light up the color
      setActiveColor(color);
      setAnimationIndex(currentIndex);
      
      // Dim after SHOW_DURATION
      setTimeout(() => {
        setActiveColor(null);
        
        // Show next color after gap
        currentIndex++;
        timeoutId = setTimeout(showNextColor, SHOW_GAP);
      }, SHOW_DURATION);
    };
    
    // Start animation
    showNextColor();
    
    // Cleanup
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      setActiveColor(null);
    };
  }, [isShowingSequence, sequence]);
  
  // Handle color button click
  const handleColorClick = (color: Color) => {
    if (disabled || isShowingSequence || !isInputPhase) return;
    
    // Brief visual feedback
    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 200);
    
    // Call parent handler
    onColorClick(color);
  };
  
  // Get color emoji for display
  const getColorEmoji = (color: Color): string => {
    const emojis: Record<Color, string> = {
      red: '🔴',
      blue: '🔵',
      yellow: '🟡',
      green: '🟢',
    };
    return emojis[color];
  };
  
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Round Display */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-2">
          Round {round}
        </h2>
        <p className="text-lg text-gray-300">
          {isShowingSequence 
            ? '👀 Watch the sequence!' 
            : isInputPhase
              ? '🎮 Your turn!' 
              : disabled 
                ? '⏸️ Waiting...' 
                : '✅ Ready'}
        </p>
      </div>
      
      {/* Color Grid (2x2) */}
      <div className="grid grid-cols-2 gap-4 p-6 bg-gray-800 rounded-3xl shadow-2xl">
        {/* Top Row: Red, Blue */}
        <ColorButton
          color="red"
          isActive={activeColor === 'red'}
          onClick={() => handleColorClick('red')}
          disabled={disabled || isShowingSequence}
        />
        <ColorButton
          color="blue"
          isActive={activeColor === 'blue'}
          onClick={() => handleColorClick('blue')}
          disabled={disabled || isShowingSequence}
        />
        
        {/* Bottom Row: Yellow, Green */}
        <ColorButton
          color="yellow"
          isActive={activeColor === 'yellow'}
          onClick={() => handleColorClick('yellow')}
          disabled={disabled || isShowingSequence}
        />
        <ColorButton
          color="green"
          isActive={activeColor === 'green'}
          onClick={() => handleColorClick('green')}
          disabled={disabled || isShowingSequence}
        />
      </div>
      
      {/* Player Sequence Display (Step 2) */}
      {isInputPhase && (
        <div className="bg-gray-700 rounded-2xl p-4 min-w-[320px]">
          <h3 className="text-white text-sm font-semibold mb-2 text-center">
            Your Sequence ({playerSequence.length} of {sequence.length})
          </h3>
          <div className="flex justify-center items-center gap-2 min-h-[40px]">
            {playerSequence.length === 0 ? (
              <span className="text-gray-400 text-sm">Click colors in order...</span>
            ) : (
              playerSequence.map((color, i) => (
                <span key={i} className="text-3xl">
                  {getColorEmoji(color)}
                </span>
              ))
            )}
          </div>
        </div>
      )}
      
      {/* Submit Button (Step 2) */}
      {isInputPhase && (
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className={`
            px-8 py-4 rounded-xl font-bold text-lg
            transition-all duration-200
            ${canSubmit 
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'}
          `}
        >
          {canSubmit ? '✅ SUBMIT' : '⏳ Complete the sequence...'}
        </button>
      )}
      
      {/* Result Display (Step 2) */}
      {lastResult && (
        <div className={`
          rounded-2xl p-6 text-center
          ${lastResult.isCorrect 
            ? 'bg-green-500/20 border-2 border-green-500' 
            : 'bg-red-500/20 border-2 border-red-500'}
        `}>
          <div className="text-4xl mb-2">
            {lastResult.isCorrect ? '✅' : '❌'}
          </div>
          <div className="text-white text-xl font-bold">
            {lastResult.isCorrect ? 'CORRECT!' : 'WRONG!'}
          </div>
          <div className="text-gray-300 text-sm mt-1">
            {lastResult.isCorrect 
              ? 'Great job! Next round coming...' 
              : 'Better luck next time!'}
          </div>
        </div>
      )}
      
      {/* Sequence Display (for debugging) */}
      {isShowingSequence && (
        <div className="text-center text-gray-400 text-sm">
          Sequence: {sequence.map((c, i) => (
            <span 
              key={i} 
              className={`mx-1 ${i === animationIndex ? 'font-bold text-white' : ''}`}
            >
              {c}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimonBoard;
