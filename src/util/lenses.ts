import {Lens, Optional, Iso} from 'monocle-ts';
import {head, init, identity} from 'ramda';

export const headLens = <A>() => new Optional<A[], A>(head, a => s => [a, ...init(s)]);

export const normalize = <A>(f: (s: A) => A) => <S>(lens: Lens<S, A>) => 
  lens.composeIso(new Iso(identity, f));
