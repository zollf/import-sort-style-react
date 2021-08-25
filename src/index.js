const fixedOrder = ['react', 'prop-types'];

export default function(styleApi) {
  const {
    and,
    hasDefaultMember,
    hasNamedMembers,
    hasNamespaceMember,
    hasNoMember,
    hasOnlyDefaultMember,
    hasOnlyNamedMembers,
    hasOnlyNamespaceMember,
    isAbsoluteModule,
    isRelativeModule,
    member,
    name,
    not,
    startsWithAlphanumeric,
    startsWithLowerCase,
    startsWithUpperCase,
    unicode,
    moduleName,
  } = styleApi;

  const isReactModule = imported =>
    Boolean(imported.moduleName.match(/^(react|prop-types|redux|mobx|classcat|enzyme)/));
    
  const reactComparator = (name1, name2) => {
    let i1 = fixedOrder.indexOf(name1);
    let i2 = fixedOrder.indexOf(name2);

    i1 = i1 === -1 ? Number.MAX_SAFE_INTEGER : i1;
    i2 = i2 === -1 ? Number.MAX_SAFE_INTEGER : i2;

    return i1 === i2 ? naturally(name1, name2) : i1 - i2;
  };

  return [
    // import "foo"
    {match: and(hasNoMember, isAbsoluteModule)},
    {separator: true},

    // import "./foo"
    {match: and(hasNoMember, isRelativeModule)},
    {separator: true},

    // import React from 'react';
    {
      match: isReactModule,
      sort: moduleName(reactComparator),
      sortNamedMembers: alias(unicode),
    },
    { separator: false },

    // import * as _ from "bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isAbsoluteModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import * as Foo from "bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import * as foo from "bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isAbsoluteModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
    },

    // import _, * as bar from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isAbsoluteModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import Foo, * as bar from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import foo, * as bar from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },

    // import _ from "bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isAbsoluteModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import Foo from "bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import foo from "bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isAbsoluteModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
    },

    // import _, {bar, …} from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isAbsoluteModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import Foo, {bar, …} from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import foo, {bar, …} from "baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isAbsoluteModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import {_, bar, …} from "baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isAbsoluteModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import {Foo, bar, …} from "baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isAbsoluteModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import {foo, bar, …} from "baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isAbsoluteModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    {separator: true},

    // import * as _ from "./bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isRelativeModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import * as Foo from "./bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import * as foo from "./bar";
    {
      match: and(
        hasOnlyNamespaceMember,
        isRelativeModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
    },

    // import _, * as bar from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isRelativeModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import Foo, * as bar from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import foo, * as bar from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamespaceMember,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },

    // import _ from "./bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isRelativeModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
    },
    // import Foo from "./bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
    },
    // import foo from "./bar";
    {
      match: and(
        hasOnlyDefaultMember,
        isRelativeModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
    },

    // import _, {bar, …} from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isRelativeModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import Foo, {bar, …} from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import foo, {bar, …} from "./baz";
    {
      match: and(
        hasDefaultMember,
        hasNamedMembers,
        isRelativeModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    // import {_, bar, …} from "./baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isRelativeModule,
        not(member(startsWithAlphanumeric)),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import {Foo, bar, …} from "./baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isRelativeModule,
        member(startsWithUpperCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },
    // import {foo, bar, …} from "./baz";
    {
      match: and(
        hasOnlyNamedMembers,
        isRelativeModule,
        member(startsWithLowerCase),
      ),
      sort: member(unicode),
      sortNamedMembers: name(unicode),
    },

    {separator: true},
  ];
}
