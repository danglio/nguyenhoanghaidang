import React from 'react';

/**
 * Đăng LIO - Authentic Luxury Monogram & Brand Typography
 * Recreated with mathematical precision from the official DL emblem.
 */
export function DangLioEmblem({ className = 'w-9 h-9' }) {
  return (
    <svg
      className={`${className} shrink-0`}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Mask to create natural openings where the ribbon and flourish cross the frame */}
        <mask id="squircleNavbarMask">
          <rect x="0" y="0" width="512" height="512" fill="white" />
          {/* Gap on left where ribbon crosses */}
          <rect x="25" y="155" width="65" height="135" fill="black" />
          {/* Gap on right where L tail crosses */}
          <rect x="435" y="305" width="65" height="125" fill="black" />
        </mask>
      </defs>

      {/* Precision Squircle Frame */}
      <rect
        x="46"
        y="46"
        width="420"
        height="420"
        rx="84"
        fill="none"
        stroke="currentColor"
        strokeWidth="16"
        strokeLinecap="round"
        mask="url(#squircleNavbarMask)"
      />

      {/* The Authentic Intertwined DL Monogram */}
      <path
        d="M260 310 L258 309 L254 310 L240 308 L231 304 L227 305 L223 321 L217 337 L208 354 L200 365 L187 378 L178 385 L165 392 L149 396 L121 396 L117 395 L114 392 L114 317 L113 315 L108 314 L100 316 L98 318 L86 320 L85 323 L86 409 L100 410 L122 414 L156 414 L169 412 L180 408 L184 408 L197 402 L216 389 L233 372 L239 364 L248 349 L249 344 L254 335 L260 318 Z M183 417 L184 426 L215 416 L243 416 L259 419 L287 429 L328 450 L349 458 L376 464 L402 464 L432 455 L443 447 L460 428 L471 402 L473 391 L473 369 L468 351 L460 335 L449 324 L441 319 L431 316 L420 316 L409 322 L410 330 L429 329 L436 332 L450 346 L456 361 L455 381 L449 395 L439 408 L422 422 L399 429 L373 428 L359 425 L297 403 L274 398 L264 398 L261 396 L270 388 L284 368 L296 339 L302 309 L301 302 L295 302 L266 311 L256 353 L247 371 L239 382 L219 400 L192 411 Z M111 150 L106 150 L97 153 L88 154 L87 155 L85 155 L84 157 L85 234 L84 269 L85 270 L85 272 L91 272 L97 269 L100 269 L109 265 L113 264 L114 253 L113 221 L114 214 L113 206 L114 205 L113 198 L113 151 Z M384 134 L373 121 L359 113 L336 113 L310 125 L290 148 L272 197 L270 271 L292 264 L303 256 L310 190 L317 168 L331 144 L352 132 L361 137 L367 153 L363 186 L344 224 L315 256 L295 271 L268 281 L250 282 L186 260 L159 259 L84 282 L57 284 L39 276 L26 260 L21 239 L26 204 L38 182 L57 162 L84 146 L109 140 L143 142 L166 151 L181 162 L200 182 L214 206 L225 241 L228 267 L242 272 L264 272 L263 245 L251 201 L233 171 L207 146 L172 128 L142 121 L104 121 L66 131 L28 156 L10 178 L10 290 L24 303 L57 315 L97 310 L168 284 L194 284 L245 301 L277 300 L306 291 L337 272 L365 241 L378 220 L390 175 Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function DangLioFullLogo() {
  return (
    <div className="flex items-center space-x-2.5 sm:space-x-3 group cursor-pointer">
      <DangLioEmblem className="w-8 h-8 sm:w-9 sm:h-9 text-neutral-900 dark:text-neutral-100 transition-all duration-300 group-hover:scale-105" />
      <div className="flex flex-col justify-center">
        <span
          className="font-serif tracking-[0.18em] sm:tracking-[0.22em] text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white uppercase leading-none transition-colors select-none"
          aria-label="ĐĂNG LIO"
        >
          <span className="relative inline-block" aria-hidden="true">
            D
            <span
              className="absolute top-[48%] left-[-8%] w-[45%] h-[0.11em] bg-current -translate-y-1/2 pointer-events-none rounded-full"
            />
          </span>
          ĂNG LIO
        </span>
      </div>
    </div>
  );
}

export default DangLioFullLogo;
