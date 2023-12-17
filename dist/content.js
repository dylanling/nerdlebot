"use strict";
(() => {
  // node_modules/fp-ts/es6/function.js
  var __spreadArray = function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  function identity(a) {
    return a;
  }
  function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
    switch (arguments.length) {
      case 1:
        return ab;
      case 2:
        return function() {
          return bc(ab.apply(this, arguments));
        };
      case 3:
        return function() {
          return cd(bc(ab.apply(this, arguments)));
        };
      case 4:
        return function() {
          return de(cd(bc(ab.apply(this, arguments))));
        };
      case 5:
        return function() {
          return ef(de(cd(bc(ab.apply(this, arguments)))));
        };
      case 6:
        return function() {
          return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
        };
      case 7:
        return function() {
          return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
        };
      case 8:
        return function() {
          return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
        };
      case 9:
        return function() {
          return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
        };
    }
    return;
  }
  function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
    switch (arguments.length) {
      case 1:
        return a;
      case 2:
        return ab(a);
      case 3:
        return bc(ab(a));
      case 4:
        return cd(bc(ab(a)));
      case 5:
        return de(cd(bc(ab(a))));
      case 6:
        return ef(de(cd(bc(ab(a)))));
      case 7:
        return fg(ef(de(cd(bc(ab(a))))));
      case 8:
        return gh(fg(ef(de(cd(bc(ab(a)))))));
      case 9:
        return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
      default: {
        var ret = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
          ret = arguments[i](ret);
        }
        return ret;
      }
    }
  }
  var dual = function(arity, body) {
    var isDataFirst = typeof arity === "number" ? function(args) {
      return args.length >= arity;
    } : arity;
    return function() {
      var args = Array.from(arguments);
      if (isDataFirst(arguments)) {
        return body.apply(this, args);
      }
      return function(self) {
        return body.apply(void 0, __spreadArray([self], args, false));
      };
    };
  };

  // node_modules/fp-ts/es6/internal.js
  var isSome = function(fa) {
    return fa._tag === "Some";
  };
  var none = { _tag: "None" };
  var some = function(a) {
    return { _tag: "Some", value: a };
  };
  var isNonEmpty = function(as3) {
    return as3.length > 0;
  };
  var head = function(as3) {
    return as3[0];
  };

  // node_modules/fp-ts/es6/Functor.js
  function as(F) {
    return function(self, b) {
      return F.map(self, function() {
        return b;
      });
    };
  }
  function asUnit(F) {
    var asM = as(F);
    return function(self) {
      return asM(self, void 0);
    };
  }

  // node_modules/fp-ts/es6/Chain.js
  function tap(M) {
    return function(first, f) {
      return M.chain(first, function(a) {
        return M.map(f(a), function() {
          return a;
        });
      });
    };
  }

  // node_modules/fp-ts/es6/FromEither.js
  function fromEitherK(F) {
    return function(f) {
      return flow(f, F.fromEither);
    };
  }
  function tapEither(F, M) {
    var fromEither2 = fromEitherK(F);
    var tapM = tap(M);
    return function(self, f) {
      return tapM(self, fromEither2(f));
    };
  }

  // node_modules/fp-ts/es6/Option.js
  var none2 = none;
  var some2 = some;
  var getRight = function(ma) {
    return ma._tag === "Left" ? none2 : some2(ma.right);
  };
  var _map = function(fa, f) {
    return pipe(fa, map(f));
  };
  var _ap = function(fab, fa) {
    return pipe(fab, ap(fa));
  };
  var URI = "Option";
  var map = function(f) {
    return function(fa) {
      return isNone(fa) ? none2 : some2(f(fa.value));
    };
  };
  var Functor = {
    URI,
    map: _map
  };
  var as2 = dual(2, as(Functor));
  var asUnit2 = asUnit(Functor);
  var ap = function(fa) {
    return function(fab) {
      return isNone(fab) ? none2 : isNone(fa) ? none2 : some2(fab.value(fa.value));
    };
  };
  var flatMap = /* @__PURE__ */ dual(2, function(ma, f) {
    return isNone(ma) ? none2 : f(ma.value);
  });
  var Chain = {
    URI,
    map: _map,
    ap: _ap,
    chain: flatMap
  };
  var orElse = dual(2, function(self, that) {
    return isNone(self) ? that() : self;
  });
  var compact = /* @__PURE__ */ flatMap(identity);
  var fromEither = getRight;
  var FromEither = {
    URI,
    fromEither
  };
  var isSome2 = isSome;
  var isNone = function(fa) {
    return fa._tag === "None";
  };
  var getOrElseW = function(onNone) {
    return function(ma) {
      return isNone(ma) ? onNone() : ma.value;
    };
  };
  var getOrElse = getOrElseW;
  var tap2 = /* @__PURE__ */ dual(2, tap(Chain));
  var tapEither2 = /* @__PURE__ */ dual(2, tapEither(FromEither, Chain));
  var fromNullable = function(a) {
    return a == null ? none2 : some2(a);
  };

  // src/dom.ts
  var BATTLE_BOARD_SELECTOR = ".battle-board-movies";
  var BATTLE_MOVIE_SELECTOR = ".battle-board-movie";
  var battleBoard = () => pipe(BATTLE_BOARD_SELECTOR, document.querySelector, fromNullable);
  var toMovie = (nodeText) => {
    const parts = nodeText.split(" ");
    return parts.length < 2 ? none2 : some2({
      name: parts.slice(0, -1).join(" "),
      year: parts.slice(-1)[0].replace("(", "").replace(")", "")
    });
  };
  var latestMovie = (board) => pipe(
    BATTLE_MOVIE_SELECTOR,
    board.querySelector,
    fromNullable,
    flatMap((element) => fromNullable(element.lastChild)),
    flatMap(
      (element) => element.nodeType === Node.TEXT_NODE ? fromNullable(element.textContent) : none2
    ),
    flatMap(toMovie)
  );

  // node_modules/fp-ts/es6/ReadonlyNonEmptyArray.js
  var isNonEmpty2 = isNonEmpty;
  var extract = head;
  var head2 = extract;

  // node_modules/fp-ts/es6/ReadonlyArray.js
  var isNonEmpty3 = isNonEmpty2;
  var head3 = function(as3) {
    return isNonEmpty3(as3) ? some(head2(as3)) : none;
  };

  // node_modules/fp-ts/es6/Array.js
  var head4 = head3;

  // src/battle.ts
  var initialState = {
    movies: [],
    links: {}
  };
  var lastMovie = (battle) => {
    return head4(battle.movies);
  };
  var addMovie = (battle, movie) => {
    return { ...battle, movies: [movie, ...battle.movies] };
  };
  var addMaybeMovie = (battle) => (movie) => pipe(
    movie,
    map((m) => addMovie(battle, m)),
    getOrElse(() => battle)
  );

  // src/content.ts
  var handleNewMovie = (_) => (movie) => {
    console.log(`New movie added: ${movie.name} | ${movie.year}`);
    return;
  };
  var awaitBattle = () => {
    return new Promise((resolve) => {
      if (isSome2(battleBoard()))
        return resolve(battleBoard());
      const observer = new MutationObserver((_) => {
        if (isSome2(battleBoard())) {
          observer.disconnect();
          resolve(battleBoard());
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  };
  var awaitNewMovies = (board) => {
    let battle = initialState;
    const observer = new MutationObserver((_) => {
      const topMovie = pipe(board, map(latestMovie), compact);
      if (topMovie !== lastMovie(battle)) {
        battle = pipe(topMovie, addMaybeMovie(battle));
        pipe(topMovie, map(handleNewMovie(battle)));
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  };
  console.log("active");
  awaitBattle().then(awaitNewMovies);
})();
//# sourceMappingURL=content.js.map
