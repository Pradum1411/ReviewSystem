
import React, { useState, useEffect } from 'react';
import { Star, Send, RefreshCw, Gift, AlertCircle, CheckCircle } from 'lucide-react';

function Home() {
  const [step, setStep] = useState(1); // 1: Review, 2: Roulette, 3: Result
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [userWins, setUserWins] = useState([]);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (review.trim() && rating > 0) {
      setStep(2);
      setReview("")
    }
  };

  const spinRoulette = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    const spinDuration = 3000; // 3 seconds
    
    // Simulate spinning animation
    const interval = setInterval(() => {
      setResult(Math.random() > 0.5 ? 'Win' : 'Lose');
    }, 100);
    
    // Determine final result after spin
    setTimeout(() => {
      clearInterval(interval);
      const finalResult = Math.floor(Math.random() * 100) % 2 === 0 ? 'Lose' : 'Win'
      setResult(finalResult);
      
      if (finalResult === 'Win') {
        setUserWins(prev => [...prev, new Date().toLocaleTimeString()]);
      }
      
      setIsSpinning(false);
      setStep(3);
    }, spinDuration);
  };

  const resetGame = () => {
    setStep(1);
    setReview('');
    setRating(0);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
       
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Review Form */}
          <div className="space-y-8">
            {/* Review Form Card */}
            <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 ${step === 1 ? 'border-purple-500' : 'border-gray-700'} transition-all`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-900/30 rounded-lg">
                  <Star className="w-6 h-6 text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold">Submit Your Review</h2>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-6">
                {/* Star Rating */}
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Rate your experience
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        onClick={() => setRating(star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-10 h-10 ${star <= (hoveredStar || rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {rating === 0 ? 'Select a rating' : `You rated: ${rating} star${rating > 1 ? 's' : ''}`}
                  </p>
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="block text-gray-300 mb-3 font-medium">
                    Your Review
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Share your thoughts about our service..."
                    className="w-full h-40 bg-gray-900 border-2 border-gray-700 rounded-xl p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                    required
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-2">
                    <span>Min. 10 characters</span>
                    <span className={review.length < 10 ? 'text-red-400' : 'text-green-400'}>
                      {review.length}/10
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!review.trim() || rating === 0 || review.length < 10}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                  <Send className="w-5 h-5" />
                  Submit Review & Unlock Roulette
                </button>
              </form>

              {/* Progress Steps */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s ? 'bg-purple-500 border-purple-500' : 'bg-gray-800 border-gray-600'}`}>
                      {step > s ? '✓' : s}
                    </div>
                    <span className="text-sm mt-2 text-gray-400">
                      {s === 1 ? 'Review' : s === 2 ? 'Spin' : 'Result'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-yellow-400" />
                Your Wins History
              </h3>
              {userWins.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No wins yet. Spin to win!</p>
              ) : (
                <div className="space-y-3">
                  {userWins.slice(-5).reverse().map((time, index) => (
                    <div key={index} className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="font-medium">🎉 You Won!</p>
                        <p className="text-sm text-gray-400">at {time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400">
                  Total Wins: <span className="text-green-400 font-bold">{userWins.length}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Roulette Wheel */}
          <div className="space-y-8">
            {/* Roulette Wheel Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-gray-700">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-pink-900/30 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-pink-400" />
                  </div>
                  <h2 className="text-2xl font-bold">Fortune Roulette</h2>
                </div>
                <div className="px-4 py-2 bg-gray-900 rounded-full">
                  <span className="text-sm font-semibold">
                    Step {step}/3
                  </span>
                </div>
              </div>

              {/* Wheel Container */}
              <div className="relative mb-8">
                {/* Wheel */}
                <div className={`relative w-64 h-64 mx-auto ${isSpinning ? 'animate-spin' : ''}`} style={{ animationDuration: '0.5s' }}>
                  {/* Wheel Background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 to-black border-8 border-gray-700"></div>
                  
                  {/* Win/Lose Segments */}
                  <div className="absolute inset-8 rounded-full overflow-hidden">
                    <div className="w-full h-1/2 bg-gradient-to-r from-green-500 to-emerald-600"></div>
                    <div className="w-full h-1/2 bg-gradient-to-r from-red-500 to-rose-600"></div>
                  </div>
                  
                  {/* Center Circle */}
                  <div className="absolute inset-20 rounded-full bg-gray-900 border-4 border-gray-700 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">
                        {result || '?'}
                      </div>
                      <div className="text-xs text-gray-400">Result</div>
                    </div>
                  </div>
                  
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-l-transparent border-r-transparent border-b-red-500"></div>
                  </div>
                </div>

                {/* Instructions */}
                <div className="text-center mt-8">
                  {step === 1 ? (
                    <div className="p-4 bg-gray-900/50 rounded-xl">
                      <AlertCircle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <p className="text-gray-300">Submit a review first to unlock the roulette!</p>
                    </div>
                  ) : step === 2 ? (
                    <button
                      onClick={spinRoulette}
                      disabled={isSpinning}
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all text-lg flex items-center gap-3 mx-auto"
                    >
                      {isSpinning ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          Spinning...
                        </>
                      ) : (
                        <>
                          🎡 Spin the Wheel!
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <div className={`p-4 rounded-xl ${result === 'Win' ? 'bg-green-900/30 border-2 border-green-500' : 'bg-red-900/30 border-2 border-red-500'}`}>
                        <div className="text-2xl font-bold mb-2">
                          {result === 'Win' ? '🎉 Congratulations!' : '😔 Better Luck Next Time!'}
                        </div>
                        <p className="text-lg">
                          You <span className={result === 'Win' ? 'text-green-400 font-bold' : 'text-red-400 font-bold'}>{result}!</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-900/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-purple-400">50%</div>
                  <div className="text-sm text-gray-400">Win Chance</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-green-400">{userWins.length}</div>
                  <div className="text-sm text-gray-400">Total Wins</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-yellow-400">🎁</div>
                  <div className="text-sm text-gray-400">Prizes</div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold text-blue-400">∞</div>
                  <div className="text-sm text-gray-400">Spins Left</div>
                </div>
              </div>
            </div>

            {/* Game Rules */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                📜 How It Works
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-sm">1</div>
                  <span className="text-gray-300">Submit a review with at least 10 characters and a star rating</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-sm">2</div>
                  <span className="text-gray-300">Unlock the roulette wheel and spin it</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-sm">3</div>
                  <span className="text-gray-300">Get instant result: Win or Lose (50/50 chance)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-sm">4</div>
                  <span className="text-gray-300">Track your wins and spin again with new reviews</span>
                </li>
              </ul>
            </div>

            {/* Reset Button */}
            {step === 3 && (
              <button
                onClick={resetGame}
                className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-gray-700 transition-all border border-gray-600 flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5" />
                Submit Another Review
              </button>
            )}
          </div>
        </div>

        
      </div>
    </div>
  );
}

export default Home;