var app = (function () {
    'use strict';

    function noop$1() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop$1;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function get_store_value(store) {
        let value;
        subscribe(store, _ => value = _)();
        return value;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty$1() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children$1(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * Schedules a callback to run immediately before the component is updated after any state change.
     *
     * The first time the callback runs will be before the initial `onMount`
     *
     * https://svelte.dev/docs#run-time-svelte-beforeupdate
     */
    function beforeUpdate(fn) {
        get_current_component().$$.before_update.push(fn);
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately after the component has been updated.
     *
     * The first time the callback runs will be after the initial `onMount`
     */
    function afterUpdate(fn) {
        get_current_component().$$.after_update.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop$1,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children$1(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop$1;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop$1;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    function construct_svelte_component_dev(component, props) {
        const error_message = 'this={...} of <svelte:component> should specify a Svelte component.';
        try {
            const instance = new component(props);
            if (!instance.$$ || !instance.$set || !instance.$on || !instance.$destroy) {
                throw new Error(error_message);
            }
            return instance;
        }
        catch (err) {
            const { message } = err;
            if (typeof message === 'string' && message.indexOf('is not a constructor') !== -1) {
                throw new Error(error_message);
            }
            else {
                throw err;
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop$1) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop$1) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop$1;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop$1;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop$1;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    /* node_modules/svelte-routing/src/Router.svelte generated by Svelte v3.55.1 */

    function create_fragment$p(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$p, create_fragment$p, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$p.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Route.svelte generated by Svelte v3.55.1 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block$8(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$5, create_else_block$5];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block$5(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$5.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1$5(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$5.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$8(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$o, create_fragment$o, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$o.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelte-routing/src/Link.svelte generated by Svelte v3.55.1 */
    const file$j = "node_modules/svelte-routing/src/Link.svelte";

    function create_fragment$n(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$j, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$n, create_fragment$n, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$n.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    /**
     * Represents a twirp error
     */
    class TwirpError extends Error {
        constructor(code, msg) {
            super(msg);
            this.code = TwirpErrorCode.Internal;
            this.meta = {};
            this.code = code;
            this.msg = msg;
            Object.setPrototypeOf(this, TwirpError.prototype);
        }
        /**
         * Adds a metadata kv to the error
         * @param key
         * @param value
         */
        withMeta(key, value) {
            this.meta[key] = value;
            return this;
        }
        /**
         * Returns a single metadata value
         * return "" if not found
         * @param key
         */
        getMeta(key) {
            return this.meta[key] || "";
        }
        /**
         * Add the original error cause
         * @param err
         * @param addMeta
         */
        withCause(err, addMeta = false) {
            this._originalCause = err;
            if (addMeta) {
                this.withMeta("cause", err.message);
            }
            return this;
        }
        cause() {
            return this._originalCause;
        }
        /**
         * Returns the error representation to JSON
         */
        toJSON() {
            try {
                return JSON.stringify({
                    code: this.code,
                    msg: this.msg,
                    meta: this.meta,
                });
            }
            catch (e) {
                return `{"code": "internal", "msg": "There was an error but it could not be serialized into JSON"}`;
            }
        }
        /**
         * Create a twirp error from an object
         * @param obj
         */
        static fromObject(obj) {
            const code = obj["code"] || TwirpErrorCode.Unknown;
            const msg = obj["msg"] || "unknown";
            const error = new TwirpError(code, msg);
            if (obj["meta"]) {
                Object.keys(obj["meta"]).forEach((key) => {
                    error.withMeta(key, obj["meta"][key]);
                });
            }
            return error;
        }
    }
    var TwirpErrorCode;
    (function (TwirpErrorCode) {
        // Canceled indicates the operation was cancelled (typically by the caller).
        TwirpErrorCode["Canceled"] = "canceled";
        // Unknown error. For example when handling errors raised by APIs that do not
        // return enough error information.
        TwirpErrorCode["Unknown"] = "unknown";
        // InvalidArgument indicates client specified an invalid argument. It
        // indicates arguments that are problematic regardless of the state of the
        // system (i.e. a malformed file name, required argument, number out of range,
        // etc.).
        TwirpErrorCode["InvalidArgument"] = "invalid_argument";
        // Malformed indicates an error occurred while decoding the client's request.
        // This may mean that the message was encoded improperly, or that there is a
        // disagreement in message format between the client and server.
        TwirpErrorCode["Malformed"] = "malformed";
        // DeadlineExceeded means operation expired before completion. For operations
        // that change the state of the system, this error may be returned even if the
        // operation has completed successfully (timeout).
        TwirpErrorCode["DeadlineExceeded"] = "deadline_exceeded";
        // NotFound means some requested entity was not found.
        TwirpErrorCode["NotFound"] = "not_found";
        // BadRoute means that the requested URL path wasn't routable to a Twirp
        // service and method. This is returned by the generated server, and usually
        // shouldn't be returned by applications. Instead, applications should use
        // NotFound or Unimplemented.
        TwirpErrorCode["BadRoute"] = "bad_route";
        // AlreadyExists means an attempt to create an entity failed because one
        // already exists.
        TwirpErrorCode["AlreadyExists"] = "already_exists";
        // PermissionDenied indicates the caller does not have permission to execute
        // the specified operation. It must not be used if the caller cannot be
        // identified (Unauthenticated).
        TwirpErrorCode["PermissionDenied"] = "permission_denied";
        // Unauthenticated indicates the request does not have valid authentication
        // credentials for the operation.
        TwirpErrorCode["Unauthenticated"] = "unauthenticated";
        // ResourceExhausted indicates some resource has been exhausted, perhaps a
        // per-user quota, or perhaps the entire file system is out of space.
        TwirpErrorCode["ResourceExhausted"] = "resource_exhausted";
        // FailedPrecondition indicates operation was rejected because the system is
        // not in a state required for the operation's execution. For example, doing
        // an rmdir operation on a directory that is non-empty, or on a non-directory
        // object, or when having conflicting read-modify-write on the same resource.
        TwirpErrorCode["FailedPrecondition"] = "failed_precondition";
        // Aborted indicates the operation was aborted, typically due to a concurrency
        // issue like sequencer check failures, transaction aborts, etc.
        TwirpErrorCode["Aborted"] = "aborted";
        // OutOfRange means operation was attempted past the valid range. For example,
        // seeking or reading past end of a paginated collection.
        //
        // Unlike InvalidArgument, this error indicates a problem that may be fixed if
        // the system state changes (i.e. adding more items to the collection).
        //
        // There is a fair bit of overlap between FailedPrecondition and OutOfRange.
        // We recommend using OutOfRange (the more specific error) when it applies so
        // that callers who are iterating through a space can easily look for an
        // OutOfRange error to detect when they are done.
        TwirpErrorCode["OutOfRange"] = "out_of_range";
        // Unimplemented indicates operation is not implemented or not
        // supported/enabled in this service.
        TwirpErrorCode["Unimplemented"] = "unimplemented";
        // Internal errors. When some invariants expected by the underlying system
        // have been broken. In other words, something bad happened in the library or
        // backend service. Do not confuse with HTTP Internal Server Error; an
        // Internal error could also happen on the client code, i.e. when parsing a
        // server response.
        TwirpErrorCode["Internal"] = "internal";
        // Unavailable indicates the service is currently unavailable. This is a most
        // likely a transient condition and may be corrected by retrying with a
        // backoff.
        TwirpErrorCode["Unavailable"] = "unavailable";
        // DataLoss indicates unrecoverable data loss or corruption.
        TwirpErrorCode["DataLoss"] = "data_loss";
    })(TwirpErrorCode || (TwirpErrorCode = {}));

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * Supported Twirp Content-Type
     */
    var TwirpContentType;
    (function (TwirpContentType) {
        TwirpContentType[TwirpContentType["Protobuf"] = 0] = "Protobuf";
        TwirpContentType[TwirpContentType["JSON"] = 1] = "JSON";
        TwirpContentType[TwirpContentType["Unknown"] = 2] = "Unknown";
    })(TwirpContentType || (TwirpContentType = {}));

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    function _process (v, mod) {
      var i;
      var r;

      if (typeof mod === 'function') {
        r = mod(v);
        if (r !== undefined) {
          v = r;
        }
      } else if (Array.isArray(mod)) {
        for (i = 0; i < mod.length; i++) {
          r = mod[i](v);
          if (r !== undefined) {
            v = r;
          }
        }
      }

      return v
    }

    function parseKey (key, val) {
      // detect negative index notation
      if (key[0] === '-' && Array.isArray(val) && /^-\d+$/.test(key)) {
        return val.length + parseInt(key, 10)
      }
      return key
    }

    function isIndex (k) {
      return /^\d+$/.test(k)
    }

    function isObject (val) {
      return Object.prototype.toString.call(val) === '[object Object]'
    }

    function isArrayOrObject (val) {
      return Object(val) === val
    }

    function isEmptyObject (val) {
      return Object.keys(val).length === 0
    }

    var blacklist = ['__proto__', 'prototype', 'constructor'];
    var blacklistFilter = function (part) { return blacklist.indexOf(part) === -1 };

    function parsePath (path, sep) {
      if (path.indexOf('[') >= 0) {
        path = path.replace(/\[/g, sep).replace(/]/g, '');
      }

      var parts = path.split(sep);

      var check = parts.filter(blacklistFilter);

      if (check.length !== parts.length) {
        throw Error('Refusing to update blacklisted property ' + path)
      }

      return parts
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    function DotObject (separator, override, useArray, useBrackets) {
      if (!(this instanceof DotObject)) {
        return new DotObject(separator, override, useArray, useBrackets)
      }

      if (typeof override === 'undefined') override = false;
      if (typeof useArray === 'undefined') useArray = true;
      if (typeof useBrackets === 'undefined') useBrackets = true;
      this.separator = separator || '.';
      this.override = override;
      this.useArray = useArray;
      this.useBrackets = useBrackets;
      this.keepArray = false;

      // contains touched arrays
      this.cleanup = [];
    }

    var dotDefault = new DotObject('.', false, true, true);
    function wrap (method) {
      return function () {
        return dotDefault[method].apply(dotDefault, arguments)
      }
    }

    DotObject.prototype._fill = function (a, obj, v, mod) {
      var k = a.shift();

      if (a.length > 0) {
        obj[k] = obj[k] || (this.useArray && isIndex(a[0]) ? [] : {});

        if (!isArrayOrObject(obj[k])) {
          if (this.override) {
            obj[k] = {};
          } else {
            if (!(isArrayOrObject(v) && isEmptyObject(v))) {
              throw new Error(
                'Trying to redefine `' + k + '` which is a ' + typeof obj[k]
              )
            }

            return
          }
        }

        this._fill(a, obj[k], v, mod);
      } else {
        if (!this.override && isArrayOrObject(obj[k]) && !isEmptyObject(obj[k])) {
          if (!(isArrayOrObject(v) && isEmptyObject(v))) {
            throw new Error("Trying to redefine non-empty obj['" + k + "']")
          }

          return
        }

        obj[k] = _process(v, mod);
      }
    };

    /**
     *
     * Converts an object with dotted-key/value pairs to it's expanded version
     *
     * Optionally transformed by a set of modifiers.
     *
     * Usage:
     *
     *   var row = {
     *     'nr': 200,
     *     'doc.name': '  My Document  '
     *   }
     *
     *   var mods = {
     *     'doc.name': [_s.trim, _s.underscored]
     *   }
     *
     *   dot.object(row, mods)
     *
     * @param {Object} obj
     * @param {Object} mods
     */
    DotObject.prototype.object = function (obj, mods) {
      var self = this;

      Object.keys(obj).forEach(function (k) {
        var mod = mods === undefined ? null : mods[k];
        // normalize array notation.
        var ok = parsePath(k, self.separator).join(self.separator);

        if (ok.indexOf(self.separator) !== -1) {
          self._fill(ok.split(self.separator), obj, obj[k], mod);
          delete obj[k];
        } else {
          obj[k] = _process(obj[k], mod);
        }
      });

      return obj
    };

    /**
     * @param {String} path dotted path
     * @param {String} v value to be set
     * @param {Object} obj object to be modified
     * @param {Function|Array} mod optional modifier
     */
    DotObject.prototype.str = function (path, v, obj, mod) {
      var ok = parsePath(path, this.separator).join(this.separator);

      if (path.indexOf(this.separator) !== -1) {
        this._fill(ok.split(this.separator), obj, v, mod);
      } else {
        obj[path] = _process(v, mod);
      }

      return obj
    };

    /**
     *
     * Pick a value from an object using dot notation.
     *
     * Optionally remove the value
     *
     * @param {String} path
     * @param {Object} obj
     * @param {Boolean} remove
     */
    DotObject.prototype.pick = function (path, obj, remove, reindexArray) {
      var i;
      var keys;
      var val;
      var key;
      var cp;

      keys = parsePath(path, this.separator);
      for (i = 0; i < keys.length; i++) {
        key = parseKey(keys[i], obj);
        if (obj && typeof obj === 'object' && key in obj) {
          if (i === keys.length - 1) {
            if (remove) {
              val = obj[key];
              if (reindexArray && Array.isArray(obj)) {
                obj.splice(key, 1);
              } else {
                delete obj[key];
              }
              if (Array.isArray(obj)) {
                cp = keys.slice(0, -1).join('.');
                if (this.cleanup.indexOf(cp) === -1) {
                  this.cleanup.push(cp);
                }
              }
              return val
            } else {
              return obj[key]
            }
          } else {
            obj = obj[key];
          }
        } else {
          return undefined
        }
      }
      if (remove && Array.isArray(obj)) {
        obj = obj.filter(function (n) {
          return n !== undefined
        });
      }
      return obj
    };
    /**
     *
     * Delete value from an object using dot notation.
     *
     * @param {String} path
     * @param {Object} obj
     * @return {any} The removed value
     */
    DotObject.prototype.delete = function (path, obj) {
      return this.remove(path, obj, true)
    };

    /**
     *
     * Remove value from an object using dot notation.
     *
     * Will remove multiple items if path is an array.
     * In this case array indexes will be retained until all
     * removals have been processed.
     *
     * Use dot.delete() to automatically  re-index arrays.
     *
     * @param {String|Array<String>} path
     * @param {Object} obj
     * @param {Boolean} reindexArray
     * @return {any} The removed value
     */
    DotObject.prototype.remove = function (path, obj, reindexArray) {
      var i;

      this.cleanup = [];
      if (Array.isArray(path)) {
        for (i = 0; i < path.length; i++) {
          this.pick(path[i], obj, true, reindexArray);
        }
        if (!reindexArray) {
          this._cleanup(obj);
        }
        return obj
      } else {
        return this.pick(path, obj, true, reindexArray)
      }
    };

    DotObject.prototype._cleanup = function (obj) {
      var ret;
      var i;
      var keys;
      var root;
      if (this.cleanup.length) {
        for (i = 0; i < this.cleanup.length; i++) {
          keys = this.cleanup[i].split('.');
          root = keys.splice(0, -1).join('.');
          ret = root ? this.pick(root, obj) : obj;
          ret = ret[keys[0]].filter(function (v) {
            return v !== undefined
          });
          this.set(this.cleanup[i], ret, obj);
        }
        this.cleanup = [];
      }
    };

    /**
     * Alias method  for `dot.remove`
     *
     * Note: this is not an alias for dot.delete()
     *
     * @param {String|Array<String>} path
     * @param {Object} obj
     * @param {Boolean} reindexArray
     * @return {any} The removed value
     */
    DotObject.prototype.del = DotObject.prototype.remove;

    /**
     *
     * Move a property from one place to the other.
     *
     * If the source path does not exist (undefined)
     * the target property will not be set.
     *
     * @param {String} source
     * @param {String} target
     * @param {Object} obj
     * @param {Function|Array} mods
     * @param {Boolean} merge
     */
    DotObject.prototype.move = function (source, target, obj, mods, merge) {
      if (typeof mods === 'function' || Array.isArray(mods)) {
        this.set(target, _process(this.pick(source, obj, true), mods), obj, merge);
      } else {
        merge = mods;
        this.set(target, this.pick(source, obj, true), obj, merge);
      }

      return obj
    };

    /**
     *
     * Transfer a property from one object to another object.
     *
     * If the source path does not exist (undefined)
     * the property on the other object will not be set.
     *
     * @param {String} source
     * @param {String} target
     * @param {Object} obj1
     * @param {Object} obj2
     * @param {Function|Array} mods
     * @param {Boolean} merge
     */
    DotObject.prototype.transfer = function (
      source,
      target,
      obj1,
      obj2,
      mods,
      merge
    ) {
      if (typeof mods === 'function' || Array.isArray(mods)) {
        this.set(
          target,
          _process(this.pick(source, obj1, true), mods),
          obj2,
          merge
        );
      } else {
        merge = mods;
        this.set(target, this.pick(source, obj1, true), obj2, merge);
      }

      return obj2
    };

    /**
     *
     * Copy a property from one object to another object.
     *
     * If the source path does not exist (undefined)
     * the property on the other object will not be set.
     *
     * @param {String} source
     * @param {String} target
     * @param {Object} obj1
     * @param {Object} obj2
     * @param {Function|Array} mods
     * @param {Boolean} merge
     */
    DotObject.prototype.copy = function (source, target, obj1, obj2, mods, merge) {
      if (typeof mods === 'function' || Array.isArray(mods)) {
        this.set(
          target,
          _process(
            // clone what is picked
            JSON.parse(JSON.stringify(this.pick(source, obj1, false))),
            mods
          ),
          obj2,
          merge
        );
      } else {
        merge = mods;
        this.set(target, this.pick(source, obj1, false), obj2, merge);
      }

      return obj2
    };

    /**
     *
     * Set a property on an object using dot notation.
     *
     * @param {String} path
     * @param {any} val
     * @param {Object} obj
     * @param {Boolean} merge
     */
    DotObject.prototype.set = function (path, val, obj, merge) {
      var i;
      var k;
      var keys;
      var key;

      // Do not operate if the value is undefined.
      if (typeof val === 'undefined') {
        return obj
      }
      keys = parsePath(path, this.separator);

      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        if (i === keys.length - 1) {
          if (merge && isObject(val) && isObject(obj[key])) {
            for (k in val) {
              if (hasOwnProperty.call(val, k)) {
                obj[key][k] = val[k];
              }
            }
          } else if (merge && Array.isArray(obj[key]) && Array.isArray(val)) {
            for (var j = 0; j < val.length; j++) {
              obj[keys[i]].push(val[j]);
            }
          } else {
            obj[key] = val;
          }
        } else if (
          // force the value to be an object
          !hasOwnProperty.call(obj, key) ||
          (!isObject(obj[key]) && !Array.isArray(obj[key]))
        ) {
          // initialize as array if next key is numeric
          if (/^\d+$/.test(keys[i + 1])) {
            obj[key] = [];
          } else {
            obj[key] = {};
          }
        }
        obj = obj[key];
      }
      return obj
    };

    /**
     *
     * Transform an object
     *
     * Usage:
     *
     *   var obj = {
     *     "id": 1,
     *    "some": {
     *      "thing": "else"
     *    }
     *   }
     *
     *   var transform = {
     *     "id": "nr",
     *    "some.thing": "name"
     *   }
     *
     *   var tgt = dot.transform(transform, obj)
     *
     * @param {Object} recipe Transform recipe
     * @param {Object} obj Object to be transformed
     * @param {Array} mods modifiers for the target
     */
    DotObject.prototype.transform = function (recipe, obj, tgt) {
      obj = obj || {};
      tgt = tgt || {};
      Object.keys(recipe).forEach(
        function (key) {
          this.set(recipe[key], this.pick(key, obj), tgt);
        }.bind(this)
      );
      return tgt
    };

    /**
     *
     * Convert object to dotted-key/value pair
     *
     * Usage:
     *
     *   var tgt = dot.dot(obj)
     *
     *   or
     *
     *   var tgt = {}
     *   dot.dot(obj, tgt)
     *
     * @param {Object} obj source object
     * @param {Object} tgt target object
     * @param {Array} path path array (internal)
     */
    DotObject.prototype.dot = function (obj, tgt, path) {
      tgt = tgt || {};
      path = path || [];
      var isArray = Array.isArray(obj);

      Object.keys(obj).forEach(
        function (key) {
          var index = isArray && this.useBrackets ? '[' + key + ']' : key;
          if (
            isArrayOrObject(obj[key]) &&
            ((isObject(obj[key]) && !isEmptyObject(obj[key])) ||
              (Array.isArray(obj[key]) && !this.keepArray && obj[key].length !== 0))
          ) {
            if (isArray && this.useBrackets) {
              var previousKey = path[path.length - 1] || '';
              return this.dot(
                obj[key],
                tgt,
                path.slice(0, -1).concat(previousKey + index)
              )
            } else {
              return this.dot(obj[key], tgt, path.concat(index))
            }
          } else {
            if (isArray && this.useBrackets) {
              tgt[path.join(this.separator).concat('[' + key + ']')] = obj[key];
            } else {
              tgt[path.concat(index).join(this.separator)] = obj[key];
            }
          }
        }.bind(this)
      );
      return tgt
    };

    DotObject.pick = wrap('pick');
    DotObject.move = wrap('move');
    DotObject.transfer = wrap('transfer');
    DotObject.transform = wrap('transform');
    DotObject.copy = wrap('copy');
    DotObject.object = wrap('object');
    DotObject.str = wrap('str');
    DotObject.set = wrap('set');
    DotObject.delete = wrap('delete');
    DotObject.del = DotObject.remove = wrap('remove');
    DotObject.dot = wrap('dot');
    ['override', 'overwrite'].forEach(function (prop) {
      Object.defineProperty(DotObject, prop, {
        get: function () {
          return dotDefault.override
        },
        set: function (val) {
          dotDefault.override = !!val;
        }
      });
    });
    ['useArray', 'keepArray', 'useBrackets'].forEach(function (prop) {
      Object.defineProperty(DotObject, prop, {
        get: function () {
          return dotDefault[prop]
        },
        set: function (val) {
          dotDefault[prop] = val;
        }
      });
    });

    DotObject._process = _process;

    var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    /**
     * a browser fetch RPC implementation
     */
    const FetchRPC = (options) => ({
        request(service, method, contentType, data) {
            return __awaiter(this, void 0, void 0, function* () {
                const headers = new Headers(options.headers);
                headers.set("content-type", contentType);
                const response = yield fetch(`${options.baseUrl}/${service}/${method}`, Object.assign(Object.assign({}, options), { method: "POST", headers, body: data instanceof Uint8Array ? data : JSON.stringify(data) }));
                if (response.status === 200) {
                    if (contentType === "application/json") {
                        return yield response.json();
                    }
                    return new Uint8Array(yield response.arrayBuffer());
                }
                throw TwirpError.fromObject(yield response.json());
            });
        },
    });

    (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };
    var Pattern;
    (function (Pattern) {
        Pattern["POST"] = "post";
        Pattern["GET"] = "get";
        Pattern["PATCH"] = "patch";
        Pattern["PUT"] = "put";
        Pattern["DELETE"] = "delete";
    })(Pattern || (Pattern = {}));

    /**
     * Get the type of a JSON value.
     * Distinguishes between array, null and object.
     */
    function typeofJsonValue(value) {
        let t = typeof value;
        if (t == "object") {
            if (Array.isArray(value))
                return "array";
            if (value === null)
                return "null";
        }
        return t;
    }
    /**
     * Is this a JSON object (instead of an array or null)?
     */
    function isJsonObject(value) {
        return value !== null && typeof value == "object" && !Array.isArray(value);
    }

    // lookup table from base64 character to byte
    let encTable = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
    // lookup table from base64 character *code* to byte because lookup by number is fast
    let decTable = [];
    for (let i = 0; i < encTable.length; i++)
        decTable[encTable[i].charCodeAt(0)] = i;
    // support base64url variants
    decTable["-".charCodeAt(0)] = encTable.indexOf("+");
    decTable["_".charCodeAt(0)] = encTable.indexOf("/");
    /**
     * Decodes a base64 string to a byte array.
     *
     * - ignores white-space, including line breaks and tabs
     * - allows inner padding (can decode concatenated base64 strings)
     * - does not require padding
     * - understands base64url encoding:
     *   "-" instead of "+",
     *   "_" instead of "/",
     *   no padding
     */
    function base64decode(base64Str) {
        // estimate byte size, not accounting for inner padding and whitespace
        let es = base64Str.length * 3 / 4;
        // if (es % 3 !== 0)
        // throw new Error('invalid base64 string');
        if (base64Str[base64Str.length - 2] == '=')
            es -= 2;
        else if (base64Str[base64Str.length - 1] == '=')
            es -= 1;
        let bytes = new Uint8Array(es), bytePos = 0, // position in byte array
        groupPos = 0, // position in base64 group
        b, // current byte
        p = 0 // previous byte
        ;
        for (let i = 0; i < base64Str.length; i++) {
            b = decTable[base64Str.charCodeAt(i)];
            if (b === undefined) {
                // noinspection FallThroughInSwitchStatementJS
                switch (base64Str[i]) {
                    case '=':
                        groupPos = 0; // reset state when padding found
                    case '\n':
                    case '\r':
                    case '\t':
                    case ' ':
                        continue; // skip white-space, and padding
                    default:
                        throw Error(`invalid base64 string.`);
                }
            }
            switch (groupPos) {
                case 0:
                    p = b;
                    groupPos = 1;
                    break;
                case 1:
                    bytes[bytePos++] = p << 2 | (b & 48) >> 4;
                    p = b;
                    groupPos = 2;
                    break;
                case 2:
                    bytes[bytePos++] = (p & 15) << 4 | (b & 60) >> 2;
                    p = b;
                    groupPos = 3;
                    break;
                case 3:
                    bytes[bytePos++] = (p & 3) << 6 | b;
                    groupPos = 0;
                    break;
            }
        }
        if (groupPos == 1)
            throw Error(`invalid base64 string.`);
        return bytes.subarray(0, bytePos);
    }
    /**
     * Encodes a byte array to a base64 string.
     * Adds padding at the end.
     * Does not insert newlines.
     */
    function base64encode(bytes) {
        let base64 = '', groupPos = 0, // position in base64 group
        b, // current byte
        p = 0; // carry over from previous byte
        for (let i = 0; i < bytes.length; i++) {
            b = bytes[i];
            switch (groupPos) {
                case 0:
                    base64 += encTable[b >> 2];
                    p = (b & 3) << 4;
                    groupPos = 1;
                    break;
                case 1:
                    base64 += encTable[p | b >> 4];
                    p = (b & 15) << 2;
                    groupPos = 2;
                    break;
                case 2:
                    base64 += encTable[p | b >> 6];
                    base64 += encTable[b & 63];
                    groupPos = 0;
                    break;
            }
        }
        // padding required?
        if (groupPos) {
            base64 += encTable[p];
            base64 += '=';
            if (groupPos == 1)
                base64 += '=';
        }
        return base64;
    }

    /**
     * This handler implements the default behaviour for unknown fields.
     * When reading data, unknown fields are stored on the message, in a
     * symbol property.
     * When writing data, the symbol property is queried and unknown fields
     * are serialized into the output again.
     */
    var UnknownFieldHandler;
    (function (UnknownFieldHandler) {
        /**
         * The symbol used to store unknown fields for a message.
         * The property must conform to `UnknownFieldContainer`.
         */
        UnknownFieldHandler.symbol = Symbol.for("protobuf-ts/unknown");
        /**
         * Store an unknown field during binary read directly on the message.
         * This method is compatible with `BinaryReadOptions.readUnknownField`.
         */
        UnknownFieldHandler.onRead = (typeName, message, fieldNo, wireType, data) => {
            let container = is(message) ? message[UnknownFieldHandler.symbol] : message[UnknownFieldHandler.symbol] = [];
            container.push({ no: fieldNo, wireType, data });
        };
        /**
         * Write unknown fields stored for the message to the writer.
         * This method is compatible with `BinaryWriteOptions.writeUnknownFields`.
         */
        UnknownFieldHandler.onWrite = (typeName, message, writer) => {
            for (let { no, wireType, data } of UnknownFieldHandler.list(message))
                writer.tag(no, wireType).raw(data);
        };
        /**
         * List unknown fields stored for the message.
         * Note that there may be multiples fields with the same number.
         */
        UnknownFieldHandler.list = (message, fieldNo) => {
            if (is(message)) {
                let all = message[UnknownFieldHandler.symbol];
                return fieldNo ? all.filter(uf => uf.no == fieldNo) : all;
            }
            return [];
        };
        /**
         * Returns the last unknown field by field number.
         */
        UnknownFieldHandler.last = (message, fieldNo) => UnknownFieldHandler.list(message, fieldNo).slice(-1)[0];
        const is = (message) => message && Array.isArray(message[UnknownFieldHandler.symbol]);
    })(UnknownFieldHandler || (UnknownFieldHandler = {}));
    /**
     * Protobuf binary format wire types.
     *
     * A wire type provides just enough information to find the length of the
     * following value.
     *
     * See https://developers.google.com/protocol-buffers/docs/encoding#structure
     */
    var WireType;
    (function (WireType) {
        /**
         * Used for int32, int64, uint32, uint64, sint32, sint64, bool, enum
         */
        WireType[WireType["Varint"] = 0] = "Varint";
        /**
         * Used for fixed64, sfixed64, double.
         * Always 8 bytes with little-endian byte order.
         */
        WireType[WireType["Bit64"] = 1] = "Bit64";
        /**
         * Used for string, bytes, embedded messages, packed repeated fields
         *
         * Only repeated numeric types (types which use the varint, 32-bit,
         * or 64-bit wire types) can be packed. In proto3, such fields are
         * packed by default.
         */
        WireType[WireType["LengthDelimited"] = 2] = "LengthDelimited";
        /**
         * Used for groups
         * @deprecated
         */
        WireType[WireType["StartGroup"] = 3] = "StartGroup";
        /**
         * Used for groups
         * @deprecated
         */
        WireType[WireType["EndGroup"] = 4] = "EndGroup";
        /**
         * Used for fixed32, sfixed32, float.
         * Always 4 bytes with little-endian byte order.
         */
        WireType[WireType["Bit32"] = 5] = "Bit32";
    })(WireType || (WireType = {}));

    // Copyright 2008 Google Inc.  All rights reserved.
    //
    // Redistribution and use in source and binary forms, with or without
    // modification, are permitted provided that the following conditions are
    // met:
    //
    // * Redistributions of source code must retain the above copyright
    // notice, this list of conditions and the following disclaimer.
    // * Redistributions in binary form must reproduce the above
    // copyright notice, this list of conditions and the following disclaimer
    // in the documentation and/or other materials provided with the
    // distribution.
    // * Neither the name of Google Inc. nor the names of its
    // contributors may be used to endorse or promote products derived from
    // this software without specific prior written permission.
    //
    // THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
    // "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
    // LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
    // A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
    // OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
    // SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
    // LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
    // DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    // THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    // (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
    // OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
    //
    // Code generated by the Protocol Buffer compiler is owned by the owner
    // of the input file used when generating it.  This code is not
    // standalone and requires a support library to be linked with it.  This
    // support library is itself covered by the above license.
    /**
     * Read a 64 bit varint as two JS numbers.
     *
     * Returns tuple:
     * [0]: low bits
     * [0]: high bits
     *
     * Copyright 2008 Google Inc.  All rights reserved.
     *
     * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L175
     */
    function varint64read() {
        let lowBits = 0;
        let highBits = 0;
        for (let shift = 0; shift < 28; shift += 7) {
            let b = this.buf[this.pos++];
            lowBits |= (b & 0x7F) << shift;
            if ((b & 0x80) == 0) {
                this.assertBounds();
                return [lowBits, highBits];
            }
        }
        let middleByte = this.buf[this.pos++];
        // last four bits of the first 32 bit number
        lowBits |= (middleByte & 0x0F) << 28;
        // 3 upper bits are part of the next 32 bit number
        highBits = (middleByte & 0x70) >> 4;
        if ((middleByte & 0x80) == 0) {
            this.assertBounds();
            return [lowBits, highBits];
        }
        for (let shift = 3; shift <= 31; shift += 7) {
            let b = this.buf[this.pos++];
            highBits |= (b & 0x7F) << shift;
            if ((b & 0x80) == 0) {
                this.assertBounds();
                return [lowBits, highBits];
            }
        }
        throw new Error('invalid varint');
    }
    /**
     * Write a 64 bit varint, given as two JS numbers, to the given bytes array.
     *
     * Copyright 2008 Google Inc.  All rights reserved.
     *
     * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/writer.js#L344
     */
    function varint64write(lo, hi, bytes) {
        for (let i = 0; i < 28; i = i + 7) {
            const shift = lo >>> i;
            const hasNext = !((shift >>> 7) == 0 && hi == 0);
            const byte = (hasNext ? shift | 0x80 : shift) & 0xFF;
            bytes.push(byte);
            if (!hasNext) {
                return;
            }
        }
        const splitBits = ((lo >>> 28) & 0x0F) | ((hi & 0x07) << 4);
        const hasMoreBits = !((hi >> 3) == 0);
        bytes.push((hasMoreBits ? splitBits | 0x80 : splitBits) & 0xFF);
        if (!hasMoreBits) {
            return;
        }
        for (let i = 3; i < 31; i = i + 7) {
            const shift = hi >>> i;
            const hasNext = !((shift >>> 7) == 0);
            const byte = (hasNext ? shift | 0x80 : shift) & 0xFF;
            bytes.push(byte);
            if (!hasNext) {
                return;
            }
        }
        bytes.push((hi >>> 31) & 0x01);
    }
    // constants for binary math
    const TWO_PWR_32_DBL$1 = (1 << 16) * (1 << 16);
    /**
     * Parse decimal string of 64 bit integer value as two JS numbers.
     *
     * Returns tuple:
     * [0]: minus sign?
     * [1]: low bits
     * [2]: high bits
     *
     * Copyright 2008 Google Inc.
     */
    function int64fromString(dec) {
        // Check for minus sign.
        let minus = dec[0] == '-';
        if (minus)
            dec = dec.slice(1);
        // Work 6 decimal digits at a time, acting like we're converting base 1e6
        // digits to binary. This is safe to do with floating point math because
        // Number.isSafeInteger(ALL_32_BITS * 1e6) == true.
        const base = 1e6;
        let lowBits = 0;
        let highBits = 0;
        function add1e6digit(begin, end) {
            // Note: Number('') is 0.
            const digit1e6 = Number(dec.slice(begin, end));
            highBits *= base;
            lowBits = lowBits * base + digit1e6;
            // Carry bits from lowBits to
            if (lowBits >= TWO_PWR_32_DBL$1) {
                highBits = highBits + ((lowBits / TWO_PWR_32_DBL$1) | 0);
                lowBits = lowBits % TWO_PWR_32_DBL$1;
            }
        }
        add1e6digit(-24, -18);
        add1e6digit(-18, -12);
        add1e6digit(-12, -6);
        add1e6digit(-6);
        return [minus, lowBits, highBits];
    }
    /**
     * Format 64 bit integer value (as two JS numbers) to decimal string.
     *
     * Copyright 2008 Google Inc.
     */
    function int64toString(bitsLow, bitsHigh) {
        // Skip the expensive conversion if the number is small enough to use the
        // built-in conversions.
        if (bitsHigh <= 0x1FFFFF) {
            return '' + (TWO_PWR_32_DBL$1 * bitsHigh + (bitsLow >>> 0));
        }
        // What this code is doing is essentially converting the input number from
        // base-2 to base-1e7, which allows us to represent the 64-bit range with
        // only 3 (very large) digits. Those digits are then trivial to convert to
        // a base-10 string.
        // The magic numbers used here are -
        // 2^24 = 16777216 = (1,6777216) in base-1e7.
        // 2^48 = 281474976710656 = (2,8147497,6710656) in base-1e7.
        // Split 32:32 representation into 16:24:24 representation so our
        // intermediate digits don't overflow.
        let low = bitsLow & 0xFFFFFF;
        let mid = (((bitsLow >>> 24) | (bitsHigh << 8)) >>> 0) & 0xFFFFFF;
        let high = (bitsHigh >> 16) & 0xFFFF;
        // Assemble our three base-1e7 digits, ignoring carries. The maximum
        // value in a digit at this step is representable as a 48-bit integer, which
        // can be stored in a 64-bit floating point number.
        let digitA = low + (mid * 6777216) + (high * 6710656);
        let digitB = mid + (high * 8147497);
        let digitC = (high * 2);
        // Apply carries from A to B and from B to C.
        let base = 10000000;
        if (digitA >= base) {
            digitB += Math.floor(digitA / base);
            digitA %= base;
        }
        if (digitB >= base) {
            digitC += Math.floor(digitB / base);
            digitB %= base;
        }
        // Convert base-1e7 digits to base-10, with optional leading zeroes.
        function decimalFrom1e7(digit1e7, needLeadingZeros) {
            let partial = digit1e7 ? String(digit1e7) : '';
            if (needLeadingZeros) {
                return '0000000'.slice(partial.length) + partial;
            }
            return partial;
        }
        return decimalFrom1e7(digitC, /*needLeadingZeros=*/ 0) +
            decimalFrom1e7(digitB, /*needLeadingZeros=*/ digitC) +
            // If the final 1e7 digit didn't need leading zeros, we would have
            // returned via the trivial code path at the top.
            decimalFrom1e7(digitA, /*needLeadingZeros=*/ 1);
    }
    /**
     * Write a 32 bit varint, signed or unsigned. Same as `varint64write(0, value, bytes)`
     *
     * Copyright 2008 Google Inc.  All rights reserved.
     *
     * See https://github.com/protocolbuffers/protobuf/blob/1b18833f4f2a2f681f4e4a25cdf3b0a43115ec26/js/binary/encoder.js#L144
     */
    function varint32write(value, bytes) {
        if (value >= 0) {
            // write value as varint 32
            while (value > 0x7f) {
                bytes.push((value & 0x7f) | 0x80);
                value = value >>> 7;
            }
            bytes.push(value);
        }
        else {
            for (let i = 0; i < 9; i++) {
                bytes.push(value & 127 | 128);
                value = value >> 7;
            }
            bytes.push(1);
        }
    }
    /**
     * Read an unsigned 32 bit varint.
     *
     * See https://github.com/protocolbuffers/protobuf/blob/8a71927d74a4ce34efe2d8769fda198f52d20d12/js/experimental/runtime/kernel/buffer_decoder.js#L220
     */
    function varint32read() {
        let b = this.buf[this.pos++];
        let result = b & 0x7F;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return result;
        }
        b = this.buf[this.pos++];
        result |= (b & 0x7F) << 7;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return result;
        }
        b = this.buf[this.pos++];
        result |= (b & 0x7F) << 14;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return result;
        }
        b = this.buf[this.pos++];
        result |= (b & 0x7F) << 21;
        if ((b & 0x80) == 0) {
            this.assertBounds();
            return result;
        }
        // Extract only last 4 bits
        b = this.buf[this.pos++];
        result |= (b & 0x0F) << 28;
        for (let readBytes = 5; ((b & 0x80) !== 0) && readBytes < 10; readBytes++)
            b = this.buf[this.pos++];
        if ((b & 0x80) != 0)
            throw new Error('invalid varint');
        this.assertBounds();
        // Result can have 32 bits, convert it to unsigned
        return result >>> 0;
    }

    function detectBi() {
        const dv = new DataView(new ArrayBuffer(8));
        const ok = globalThis.BigInt !== undefined
            && typeof dv.getBigInt64 === "function"
            && typeof dv.getBigUint64 === "function"
            && typeof dv.setBigInt64 === "function"
            && typeof dv.setBigUint64 === "function";
        return ok ? {
            MIN: BigInt("-9223372036854775808"),
            MAX: BigInt("9223372036854775807"),
            UMIN: BigInt("0"),
            UMAX: BigInt("18446744073709551615"),
            C: BigInt,
            V: dv,
        } : undefined;
    }
    const BI = detectBi();
    function assertBi(bi) {
        if (!bi)
            throw new Error("BigInt unavailable, see https://github.com/timostamm/protobuf-ts/blob/v1.0.8/MANUAL.md#bigint-support");
    }
    // used to validate from(string) input (when bigint is unavailable)
    const RE_DECIMAL_STR = /^-?[0-9]+$/;
    // constants for binary math
    const TWO_PWR_32_DBL = (1 << 16) * (1 << 16);
    // base class for PbLong and PbULong provides shared code
    class SharedPbLong {
        /**
         * Create a new instance with the given bits.
         */
        constructor(lo, hi) {
            this.lo = lo | 0;
            this.hi = hi | 0;
        }
        /**
         * Is this instance equal to 0?
         */
        isZero() {
            return this.lo == 0 && this.hi == 0;
        }
        /**
         * Convert to a native number.
         */
        toNumber() {
            let result = this.hi * TWO_PWR_32_DBL + (this.lo >>> 0);
            if (!Number.isSafeInteger(result))
                throw new Error("cannot convert to safe number");
            return result;
        }
    }
    /**
     * 64-bit unsigned integer as two 32-bit values.
     * Converts between `string`, `number` and `bigint` representations.
     */
    class PbULong extends SharedPbLong {
        /**
         * Create instance from a `string`, `number` or `bigint`.
         */
        static from(value) {
            if (BI)
                // noinspection FallThroughInSwitchStatementJS
                switch (typeof value) {
                    case "string":
                        if (value == "0")
                            return this.ZERO;
                        if (value == "")
                            throw new Error('string is no integer');
                        value = BI.C(value);
                    case "number":
                        if (value === 0)
                            return this.ZERO;
                        value = BI.C(value);
                    case "bigint":
                        if (!value)
                            return this.ZERO;
                        if (value < BI.UMIN)
                            throw new Error('signed value for ulong');
                        if (value > BI.UMAX)
                            throw new Error('ulong too large');
                        BI.V.setBigUint64(0, value, true);
                        return new PbULong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
                }
            else
                switch (typeof value) {
                    case "string":
                        if (value == "0")
                            return this.ZERO;
                        value = value.trim();
                        if (!RE_DECIMAL_STR.test(value))
                            throw new Error('string is no integer');
                        let [minus, lo, hi] = int64fromString(value);
                        if (minus)
                            throw new Error('signed value');
                        return new PbULong(lo, hi);
                    case "number":
                        if (value == 0)
                            return this.ZERO;
                        if (!Number.isSafeInteger(value))
                            throw new Error('number is no integer');
                        if (value < 0)
                            throw new Error('signed value for ulong');
                        return new PbULong(value, value / TWO_PWR_32_DBL);
                }
            throw new Error('unknown value ' + typeof value);
        }
        /**
         * Convert to decimal string.
         */
        toString() {
            return BI ? this.toBigInt().toString() : int64toString(this.lo, this.hi);
        }
        /**
         * Convert to native bigint.
         */
        toBigInt() {
            assertBi(BI);
            BI.V.setInt32(0, this.lo, true);
            BI.V.setInt32(4, this.hi, true);
            return BI.V.getBigUint64(0, true);
        }
    }
    /**
     * ulong 0 singleton.
     */
    PbULong.ZERO = new PbULong(0, 0);
    /**
     * 64-bit signed integer as two 32-bit values.
     * Converts between `string`, `number` and `bigint` representations.
     */
    class PbLong extends SharedPbLong {
        /**
         * Create instance from a `string`, `number` or `bigint`.
         */
        static from(value) {
            if (BI)
                // noinspection FallThroughInSwitchStatementJS
                switch (typeof value) {
                    case "string":
                        if (value == "0")
                            return this.ZERO;
                        if (value == "")
                            throw new Error('string is no integer');
                        value = BI.C(value);
                    case "number":
                        if (value === 0)
                            return this.ZERO;
                        value = BI.C(value);
                    case "bigint":
                        if (!value)
                            return this.ZERO;
                        if (value < BI.MIN)
                            throw new Error('ulong too small');
                        if (value > BI.MAX)
                            throw new Error('ulong too large');
                        BI.V.setBigInt64(0, value, true);
                        return new PbLong(BI.V.getInt32(0, true), BI.V.getInt32(4, true));
                }
            else
                switch (typeof value) {
                    case "string":
                        if (value == "0")
                            return this.ZERO;
                        value = value.trim();
                        if (!RE_DECIMAL_STR.test(value))
                            throw new Error('string is no integer');
                        let [minus, lo, hi] = int64fromString(value);
                        let pbl = new PbLong(lo, hi);
                        return minus ? pbl.negate() : pbl;
                    case "number":
                        if (value == 0)
                            return this.ZERO;
                        if (!Number.isSafeInteger(value))
                            throw new Error('number is no integer');
                        return value > 0
                            ? new PbLong(value, value / TWO_PWR_32_DBL)
                            : new PbLong(-value, -value / TWO_PWR_32_DBL).negate();
                }
            throw new Error('unknown value ' + typeof value);
        }
        /**
         * Do we have a minus sign?
         */
        isNegative() {
            return (this.hi & 0x80000000) !== 0;
        }
        /**
         * Negate two's complement.
         * Invert all the bits and add one to the result.
         */
        negate() {
            let hi = ~this.hi, lo = this.lo;
            if (lo)
                lo = ~lo + 1;
            else
                hi += 1;
            return new PbLong(lo, hi);
        }
        /**
         * Convert to decimal string.
         */
        toString() {
            if (BI)
                return this.toBigInt().toString();
            if (this.isNegative()) {
                let n = this.negate();
                return '-' + int64toString(n.lo, n.hi);
            }
            return int64toString(this.lo, this.hi);
        }
        /**
         * Convert to native bigint.
         */
        toBigInt() {
            assertBi(BI);
            BI.V.setInt32(0, this.lo, true);
            BI.V.setInt32(4, this.hi, true);
            return BI.V.getBigInt64(0, true);
        }
    }
    /**
     * long 0 singleton.
     */
    PbLong.ZERO = new PbLong(0, 0);

    const defaultsRead$1 = {
        readUnknownField: true,
        readerFactory: bytes => new BinaryReader(bytes),
    };
    /**
     * Make options for reading binary data form partial options.
     */
    function binaryReadOptions(options) {
        return options ? Object.assign(Object.assign({}, defaultsRead$1), options) : defaultsRead$1;
    }
    class BinaryReader {
        constructor(buf, textDecoder) {
            this.varint64 = varint64read; // dirty cast for `this`
            /**
             * Read a `uint32` field, an unsigned 32 bit varint.
             */
            this.uint32 = varint32read; // dirty cast for `this` and access to protected `buf`
            this.buf = buf;
            this.len = buf.length;
            this.pos = 0;
            this.view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
            this.textDecoder = textDecoder !== null && textDecoder !== void 0 ? textDecoder : new TextDecoder("utf-8", {
                fatal: true,
                ignoreBOM: true,
            });
        }
        /**
         * Reads a tag - field number and wire type.
         */
        tag() {
            let tag = this.uint32(), fieldNo = tag >>> 3, wireType = tag & 7;
            if (fieldNo <= 0 || wireType < 0 || wireType > 5)
                throw new Error("illegal tag: field no " + fieldNo + " wire type " + wireType);
            return [fieldNo, wireType];
        }
        /**
         * Skip one element on the wire and return the skipped data.
         * Supports WireType.StartGroup since v2.0.0-alpha.23.
         */
        skip(wireType) {
            let start = this.pos;
            // noinspection FallThroughInSwitchStatementJS
            switch (wireType) {
                case WireType.Varint:
                    while (this.buf[this.pos++] & 0x80) {
                        // ignore
                    }
                    break;
                case WireType.Bit64:
                    this.pos += 4;
                case WireType.Bit32:
                    this.pos += 4;
                    break;
                case WireType.LengthDelimited:
                    let len = this.uint32();
                    this.pos += len;
                    break;
                case WireType.StartGroup:
                    // From descriptor.proto: Group type is deprecated, not supported in proto3.
                    // But we must still be able to parse and treat as unknown.
                    let t;
                    while ((t = this.tag()[1]) !== WireType.EndGroup) {
                        this.skip(t);
                    }
                    break;
                default:
                    throw new Error("cant skip wire type " + wireType);
            }
            this.assertBounds();
            return this.buf.subarray(start, this.pos);
        }
        /**
         * Throws error if position in byte array is out of range.
         */
        assertBounds() {
            if (this.pos > this.len)
                throw new RangeError("premature EOF");
        }
        /**
         * Read a `int32` field, a signed 32 bit varint.
         */
        int32() {
            return this.uint32() | 0;
        }
        /**
         * Read a `sint32` field, a signed, zigzag-encoded 32-bit varint.
         */
        sint32() {
            let zze = this.uint32();
            // decode zigzag
            return (zze >>> 1) ^ -(zze & 1);
        }
        /**
         * Read a `int64` field, a signed 64-bit varint.
         */
        int64() {
            return new PbLong(...this.varint64());
        }
        /**
         * Read a `uint64` field, an unsigned 64-bit varint.
         */
        uint64() {
            return new PbULong(...this.varint64());
        }
        /**
         * Read a `sint64` field, a signed, zig-zag-encoded 64-bit varint.
         */
        sint64() {
            let [lo, hi] = this.varint64();
            // decode zig zag
            let s = -(lo & 1);
            lo = ((lo >>> 1 | (hi & 1) << 31) ^ s);
            hi = (hi >>> 1 ^ s);
            return new PbLong(lo, hi);
        }
        /**
         * Read a `bool` field, a variant.
         */
        bool() {
            let [lo, hi] = this.varint64();
            return lo !== 0 || hi !== 0;
        }
        /**
         * Read a `fixed32` field, an unsigned, fixed-length 32-bit integer.
         */
        fixed32() {
            return this.view.getUint32((this.pos += 4) - 4, true);
        }
        /**
         * Read a `sfixed32` field, a signed, fixed-length 32-bit integer.
         */
        sfixed32() {
            return this.view.getInt32((this.pos += 4) - 4, true);
        }
        /**
         * Read a `fixed64` field, an unsigned, fixed-length 64 bit integer.
         */
        fixed64() {
            return new PbULong(this.sfixed32(), this.sfixed32());
        }
        /**
         * Read a `fixed64` field, a signed, fixed-length 64-bit integer.
         */
        sfixed64() {
            return new PbLong(this.sfixed32(), this.sfixed32());
        }
        /**
         * Read a `float` field, 32-bit floating point number.
         */
        float() {
            return this.view.getFloat32((this.pos += 4) - 4, true);
        }
        /**
         * Read a `double` field, a 64-bit floating point number.
         */
        double() {
            return this.view.getFloat64((this.pos += 8) - 8, true);
        }
        /**
         * Read a `bytes` field, length-delimited arbitrary data.
         */
        bytes() {
            let len = this.uint32();
            let start = this.pos;
            this.pos += len;
            this.assertBounds();
            return this.buf.subarray(start, start + len);
        }
        /**
         * Read a `string` field, length-delimited data converted to UTF-8 text.
         */
        string() {
            return this.textDecoder.decode(this.bytes());
        }
    }

    /**
     * assert that condition is true or throw error (with message)
     */
    function assert(condition, msg) {
        if (!condition) {
            throw new Error(msg);
        }
    }
    const FLOAT32_MAX = 3.4028234663852886e+38, FLOAT32_MIN = -3.4028234663852886e+38, UINT32_MAX = 0xFFFFFFFF, INT32_MAX = 0X7FFFFFFF, INT32_MIN = -0X80000000;
    function assertInt32(arg) {
        if (typeof arg !== "number")
            throw new Error('invalid int 32: ' + typeof arg);
        if (!Number.isInteger(arg) || arg > INT32_MAX || arg < INT32_MIN)
            throw new Error('invalid int 32: ' + arg);
    }
    function assertUInt32(arg) {
        if (typeof arg !== "number")
            throw new Error('invalid uint 32: ' + typeof arg);
        if (!Number.isInteger(arg) || arg > UINT32_MAX || arg < 0)
            throw new Error('invalid uint 32: ' + arg);
    }
    function assertFloat32(arg) {
        if (typeof arg !== "number")
            throw new Error('invalid float 32: ' + typeof arg);
        if (!Number.isFinite(arg))
            return;
        if (arg > FLOAT32_MAX || arg < FLOAT32_MIN)
            throw new Error('invalid float 32: ' + arg);
    }

    const defaultsWrite$1 = {
        writeUnknownFields: true,
        writerFactory: () => new BinaryWriter(),
    };
    /**
     * Make options for writing binary data form partial options.
     */
    function binaryWriteOptions(options) {
        return options ? Object.assign(Object.assign({}, defaultsWrite$1), options) : defaultsWrite$1;
    }
    class BinaryWriter {
        constructor(textEncoder) {
            /**
             * Previous fork states.
             */
            this.stack = [];
            this.textEncoder = textEncoder !== null && textEncoder !== void 0 ? textEncoder : new TextEncoder();
            this.chunks = [];
            this.buf = [];
        }
        /**
         * Return all bytes written and reset this writer.
         */
        finish() {
            this.chunks.push(new Uint8Array(this.buf)); // flush the buffer
            let len = 0;
            for (let i = 0; i < this.chunks.length; i++)
                len += this.chunks[i].length;
            let bytes = new Uint8Array(len);
            let offset = 0;
            for (let i = 0; i < this.chunks.length; i++) {
                bytes.set(this.chunks[i], offset);
                offset += this.chunks[i].length;
            }
            this.chunks = [];
            return bytes;
        }
        /**
         * Start a new fork for length-delimited data like a message
         * or a packed repeated field.
         *
         * Must be joined later with `join()`.
         */
        fork() {
            this.stack.push({ chunks: this.chunks, buf: this.buf });
            this.chunks = [];
            this.buf = [];
            return this;
        }
        /**
         * Join the last fork. Write its length and bytes, then
         * return to the previous state.
         */
        join() {
            // get chunk of fork
            let chunk = this.finish();
            // restore previous state
            let prev = this.stack.pop();
            if (!prev)
                throw new Error('invalid state, fork stack empty');
            this.chunks = prev.chunks;
            this.buf = prev.buf;
            // write length of chunk as varint
            this.uint32(chunk.byteLength);
            return this.raw(chunk);
        }
        /**
         * Writes a tag (field number and wire type).
         *
         * Equivalent to `uint32( (fieldNo << 3 | type) >>> 0 )`.
         *
         * Generated code should compute the tag ahead of time and call `uint32()`.
         */
        tag(fieldNo, type) {
            return this.uint32((fieldNo << 3 | type) >>> 0);
        }
        /**
         * Write a chunk of raw bytes.
         */
        raw(chunk) {
            if (this.buf.length) {
                this.chunks.push(new Uint8Array(this.buf));
                this.buf = [];
            }
            this.chunks.push(chunk);
            return this;
        }
        /**
         * Write a `uint32` value, an unsigned 32 bit varint.
         */
        uint32(value) {
            assertUInt32(value);
            // write value as varint 32, inlined for speed
            while (value > 0x7f) {
                this.buf.push((value & 0x7f) | 0x80);
                value = value >>> 7;
            }
            this.buf.push(value);
            return this;
        }
        /**
         * Write a `int32` value, a signed 32 bit varint.
         */
        int32(value) {
            assertInt32(value);
            varint32write(value, this.buf);
            return this;
        }
        /**
         * Write a `bool` value, a variant.
         */
        bool(value) {
            this.buf.push(value ? 1 : 0);
            return this;
        }
        /**
         * Write a `bytes` value, length-delimited arbitrary data.
         */
        bytes(value) {
            this.uint32(value.byteLength); // write length of chunk as varint
            return this.raw(value);
        }
        /**
         * Write a `string` value, length-delimited data converted to UTF-8 text.
         */
        string(value) {
            let chunk = this.textEncoder.encode(value);
            this.uint32(chunk.byteLength); // write length of chunk as varint
            return this.raw(chunk);
        }
        /**
         * Write a `float` value, 32-bit floating point number.
         */
        float(value) {
            assertFloat32(value);
            let chunk = new Uint8Array(4);
            new DataView(chunk.buffer).setFloat32(0, value, true);
            return this.raw(chunk);
        }
        /**
         * Write a `double` value, a 64-bit floating point number.
         */
        double(value) {
            let chunk = new Uint8Array(8);
            new DataView(chunk.buffer).setFloat64(0, value, true);
            return this.raw(chunk);
        }
        /**
         * Write a `fixed32` value, an unsigned, fixed-length 32-bit integer.
         */
        fixed32(value) {
            assertUInt32(value);
            let chunk = new Uint8Array(4);
            new DataView(chunk.buffer).setUint32(0, value, true);
            return this.raw(chunk);
        }
        /**
         * Write a `sfixed32` value, a signed, fixed-length 32-bit integer.
         */
        sfixed32(value) {
            assertInt32(value);
            let chunk = new Uint8Array(4);
            new DataView(chunk.buffer).setInt32(0, value, true);
            return this.raw(chunk);
        }
        /**
         * Write a `sint32` value, a signed, zigzag-encoded 32-bit varint.
         */
        sint32(value) {
            assertInt32(value);
            // zigzag encode
            value = ((value << 1) ^ (value >> 31)) >>> 0;
            varint32write(value, this.buf);
            return this;
        }
        /**
         * Write a `fixed64` value, a signed, fixed-length 64-bit integer.
         */
        sfixed64(value) {
            let chunk = new Uint8Array(8);
            let view = new DataView(chunk.buffer);
            let long = PbLong.from(value);
            view.setInt32(0, long.lo, true);
            view.setInt32(4, long.hi, true);
            return this.raw(chunk);
        }
        /**
         * Write a `fixed64` value, an unsigned, fixed-length 64 bit integer.
         */
        fixed64(value) {
            let chunk = new Uint8Array(8);
            let view = new DataView(chunk.buffer);
            let long = PbULong.from(value);
            view.setInt32(0, long.lo, true);
            view.setInt32(4, long.hi, true);
            return this.raw(chunk);
        }
        /**
         * Write a `int64` value, a signed 64-bit varint.
         */
        int64(value) {
            let long = PbLong.from(value);
            varint64write(long.lo, long.hi, this.buf);
            return this;
        }
        /**
         * Write a `sint64` value, a signed, zig-zag-encoded 64-bit varint.
         */
        sint64(value) {
            let long = PbLong.from(value), 
            // zigzag encode
            sign = long.hi >> 31, lo = (long.lo << 1) ^ sign, hi = ((long.hi << 1) | (long.lo >>> 31)) ^ sign;
            varint64write(lo, hi, this.buf);
            return this;
        }
        /**
         * Write a `uint64` value, an unsigned 64-bit varint.
         */
        uint64(value) {
            let long = PbULong.from(value);
            varint64write(long.lo, long.hi, this.buf);
            return this;
        }
    }

    const defaultsWrite = {
        emitDefaultValues: false,
        enumAsInteger: false,
        useProtoFieldName: false,
        prettySpaces: 0,
    }, defaultsRead = {
        ignoreUnknownFields: false,
    };
    /**
     * Make options for reading JSON data from partial options.
     */
    function jsonReadOptions(options) {
        return options ? Object.assign(Object.assign({}, defaultsRead), options) : defaultsRead;
    }
    /**
     * Make options for writing JSON data from partial options.
     */
    function jsonWriteOptions(options) {
        return options ? Object.assign(Object.assign({}, defaultsWrite), options) : defaultsWrite;
    }

    /**
     * The symbol used as a key on message objects to store the message type.
     *
     * Note that this is an experimental feature - it is here to stay, but
     * implementation details may change without notice.
     */
    const MESSAGE_TYPE = Symbol.for("protobuf-ts/message-type");

    /**
     * Converts snake_case to lowerCamelCase.
     *
     * Should behave like protoc:
     * https://github.com/protocolbuffers/protobuf/blob/e8ae137c96444ea313485ed1118c5e43b2099cf1/src/google/protobuf/compiler/java/java_helpers.cc#L118
     */
    function lowerCamelCase(snakeCase) {
        let capNext = false;
        const sb = [];
        for (let i = 0; i < snakeCase.length; i++) {
            let next = snakeCase.charAt(i);
            if (next == '_') {
                capNext = true;
            }
            else if (/\d/.test(next)) {
                sb.push(next);
                capNext = true;
            }
            else if (capNext) {
                sb.push(next.toUpperCase());
                capNext = false;
            }
            else if (i == 0) {
                sb.push(next.toLowerCase());
            }
            else {
                sb.push(next);
            }
        }
        return sb.join('');
    }

    /**
     * Scalar value types. This is a subset of field types declared by protobuf
     * enum google.protobuf.FieldDescriptorProto.Type The types GROUP and MESSAGE
     * are omitted, but the numerical values are identical.
     */
    var ScalarType;
    (function (ScalarType) {
        // 0 is reserved for errors.
        // Order is weird for historical reasons.
        ScalarType[ScalarType["DOUBLE"] = 1] = "DOUBLE";
        ScalarType[ScalarType["FLOAT"] = 2] = "FLOAT";
        // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
        // negative values are likely.
        ScalarType[ScalarType["INT64"] = 3] = "INT64";
        ScalarType[ScalarType["UINT64"] = 4] = "UINT64";
        // Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
        // negative values are likely.
        ScalarType[ScalarType["INT32"] = 5] = "INT32";
        ScalarType[ScalarType["FIXED64"] = 6] = "FIXED64";
        ScalarType[ScalarType["FIXED32"] = 7] = "FIXED32";
        ScalarType[ScalarType["BOOL"] = 8] = "BOOL";
        ScalarType[ScalarType["STRING"] = 9] = "STRING";
        // Tag-delimited aggregate.
        // Group type is deprecated and not supported in proto3. However, Proto3
        // implementations should still be able to parse the group wire format and
        // treat group fields as unknown fields.
        // TYPE_GROUP = 10,
        // TYPE_MESSAGE = 11,  // Length-delimited aggregate.
        // New in version 2.
        ScalarType[ScalarType["BYTES"] = 12] = "BYTES";
        ScalarType[ScalarType["UINT32"] = 13] = "UINT32";
        // TYPE_ENUM = 14,
        ScalarType[ScalarType["SFIXED32"] = 15] = "SFIXED32";
        ScalarType[ScalarType["SFIXED64"] = 16] = "SFIXED64";
        ScalarType[ScalarType["SINT32"] = 17] = "SINT32";
        ScalarType[ScalarType["SINT64"] = 18] = "SINT64";
    })(ScalarType || (ScalarType = {}));
    /**
     * JavaScript representation of 64 bit integral types. Equivalent to the
     * field option "jstype".
     *
     * By default, protobuf-ts represents 64 bit types as `bigint`.
     *
     * You can change the default behaviour by enabling the plugin parameter
     * `long_type_string`, which will represent 64 bit types as `string`.
     *
     * Alternatively, you can change the behaviour for individual fields
     * with the field option "jstype":
     *
     * ```protobuf
     * uint64 my_field = 1 [jstype = JS_STRING];
     * uint64 other_field = 2 [jstype = JS_NUMBER];
     * ```
     */
    var LongType;
    (function (LongType) {
        /**
         * Use JavaScript `bigint`.
         *
         * Field option `[jstype = JS_NORMAL]`.
         */
        LongType[LongType["BIGINT"] = 0] = "BIGINT";
        /**
         * Use JavaScript `string`.
         *
         * Field option `[jstype = JS_STRING]`.
         */
        LongType[LongType["STRING"] = 1] = "STRING";
        /**
         * Use JavaScript `number`.
         *
         * Large values will loose precision.
         *
         * Field option `[jstype = JS_NUMBER]`.
         */
        LongType[LongType["NUMBER"] = 2] = "NUMBER";
    })(LongType || (LongType = {}));
    /**
     * Protobuf 2.1.0 introduced packed repeated fields.
     * Setting the field option `[packed = true]` enables packing.
     *
     * In proto3, all repeated fields are packed by default.
     * Setting the field option `[packed = false]` disables packing.
     *
     * Packed repeated fields are encoded with a single tag,
     * then a length-delimiter, then the element values.
     *
     * Unpacked repeated fields are encoded with a tag and
     * value for each element.
     *
     * `bytes` and `string` cannot be packed.
     */
    var RepeatType;
    (function (RepeatType) {
        /**
         * The field is not repeated.
         */
        RepeatType[RepeatType["NO"] = 0] = "NO";
        /**
         * The field is repeated and should be packed.
         * Invalid for `bytes` and `string`, they cannot be packed.
         */
        RepeatType[RepeatType["PACKED"] = 1] = "PACKED";
        /**
         * The field is repeated but should not be packed.
         * The only valid repeat type for repeated `bytes` and `string`.
         */
        RepeatType[RepeatType["UNPACKED"] = 2] = "UNPACKED";
    })(RepeatType || (RepeatType = {}));
    /**
     * Turns PartialFieldInfo into FieldInfo.
     */
    function normalizeFieldInfo(field) {
        var _a, _b, _c, _d;
        field.localName = (_a = field.localName) !== null && _a !== void 0 ? _a : lowerCamelCase(field.name);
        field.jsonName = (_b = field.jsonName) !== null && _b !== void 0 ? _b : lowerCamelCase(field.name);
        field.repeat = (_c = field.repeat) !== null && _c !== void 0 ? _c : RepeatType.NO;
        field.opt = (_d = field.opt) !== null && _d !== void 0 ? _d : (field.repeat ? false : field.oneof ? false : field.kind == "message");
        return field;
    }

    /**
     * Is the given value a valid oneof group?
     *
     * We represent protobuf `oneof` as algebraic data types (ADT) in generated
     * code. But when working with messages of unknown type, the ADT does not
     * help us.
     *
     * This type guard checks if the given object adheres to the ADT rules, which
     * are as follows:
     *
     * 1) Must be an object.
     *
     * 2) Must have a "oneofKind" discriminator property.
     *
     * 3) If "oneofKind" is `undefined`, no member field is selected. The object
     * must not have any other properties.
     *
     * 4) If "oneofKind" is a `string`, the member field with this name is
     * selected.
     *
     * 5) If a member field is selected, the object must have a second property
     * with this name. The property must not be `undefined`.
     *
     * 6) No extra properties are allowed. The object has either one property
     * (no selection) or two properties (selection).
     *
     */
    function isOneofGroup(any) {
        if (typeof any != 'object' || any === null || !any.hasOwnProperty('oneofKind')) {
            return false;
        }
        switch (typeof any.oneofKind) {
            case "string":
                if (any[any.oneofKind] === undefined)
                    return false;
                return Object.keys(any).length == 2;
            case "undefined":
                return Object.keys(any).length == 1;
            default:
                return false;
        }
    }

    // noinspection JSMethodCanBeStatic
    class ReflectionTypeCheck {
        constructor(info) {
            var _a;
            this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
        }
        prepare() {
            if (this.data)
                return;
            const req = [], known = [], oneofs = [];
            for (let field of this.fields) {
                if (field.oneof) {
                    if (!oneofs.includes(field.oneof)) {
                        oneofs.push(field.oneof);
                        req.push(field.oneof);
                        known.push(field.oneof);
                    }
                }
                else {
                    known.push(field.localName);
                    switch (field.kind) {
                        case "scalar":
                        case "enum":
                            if (!field.opt || field.repeat)
                                req.push(field.localName);
                            break;
                        case "message":
                            if (field.repeat)
                                req.push(field.localName);
                            break;
                        case "map":
                            req.push(field.localName);
                            break;
                    }
                }
            }
            this.data = { req, known, oneofs: Object.values(oneofs) };
        }
        /**
         * Is the argument a valid message as specified by the
         * reflection information?
         *
         * Checks all field types recursively. The `depth`
         * specifies how deep into the structure the check will be.
         *
         * With a depth of 0, only the presence of fields
         * is checked.
         *
         * With a depth of 1 or more, the field types are checked.
         *
         * With a depth of 2 or more, the members of map, repeated
         * and message fields are checked.
         *
         * Message fields will be checked recursively with depth - 1.
         *
         * The number of map entries / repeated values being checked
         * is < depth.
         */
        is(message, depth, allowExcessProperties = false) {
            if (depth < 0)
                return true;
            if (message === null || message === undefined || typeof message != 'object')
                return false;
            this.prepare();
            let keys = Object.keys(message), data = this.data;
            // if a required field is missing in arg, this cannot be a T
            if (keys.length < data.req.length || data.req.some(n => !keys.includes(n)))
                return false;
            if (!allowExcessProperties) {
                // if the arg contains a key we dont know, this is not a literal T
                if (keys.some(k => !data.known.includes(k)))
                    return false;
            }
            // "With a depth of 0, only the presence and absence of fields is checked."
            // "With a depth of 1 or more, the field types are checked."
            if (depth < 1) {
                return true;
            }
            // check oneof group
            for (const name of data.oneofs) {
                const group = message[name];
                if (!isOneofGroup(group))
                    return false;
                if (group.oneofKind === undefined)
                    continue;
                const field = this.fields.find(f => f.localName === group.oneofKind);
                if (!field)
                    return false; // we found no field, but have a kind, something is wrong
                if (!this.field(group[group.oneofKind], field, allowExcessProperties, depth))
                    return false;
            }
            // check types
            for (const field of this.fields) {
                if (field.oneof !== undefined)
                    continue;
                if (!this.field(message[field.localName], field, allowExcessProperties, depth))
                    return false;
            }
            return true;
        }
        field(arg, field, allowExcessProperties, depth) {
            let repeated = field.repeat;
            switch (field.kind) {
                case "scalar":
                    if (arg === undefined)
                        return field.opt;
                    if (repeated)
                        return this.scalars(arg, field.T, depth, field.L);
                    return this.scalar(arg, field.T, field.L);
                case "enum":
                    if (arg === undefined)
                        return field.opt;
                    if (repeated)
                        return this.scalars(arg, ScalarType.INT32, depth);
                    return this.scalar(arg, ScalarType.INT32);
                case "message":
                    if (arg === undefined)
                        return true;
                    if (repeated)
                        return this.messages(arg, field.T(), allowExcessProperties, depth);
                    return this.message(arg, field.T(), allowExcessProperties, depth);
                case "map":
                    if (typeof arg != 'object' || arg === null)
                        return false;
                    if (depth < 2)
                        return true;
                    if (!this.mapKeys(arg, field.K, depth))
                        return false;
                    switch (field.V.kind) {
                        case "scalar":
                            return this.scalars(Object.values(arg), field.V.T, depth, field.V.L);
                        case "enum":
                            return this.scalars(Object.values(arg), ScalarType.INT32, depth);
                        case "message":
                            return this.messages(Object.values(arg), field.V.T(), allowExcessProperties, depth);
                    }
                    break;
            }
            return true;
        }
        message(arg, type, allowExcessProperties, depth) {
            if (allowExcessProperties) {
                return type.isAssignable(arg, depth);
            }
            return type.is(arg, depth);
        }
        messages(arg, type, allowExcessProperties, depth) {
            if (!Array.isArray(arg))
                return false;
            if (depth < 2)
                return true;
            if (allowExcessProperties) {
                for (let i = 0; i < arg.length && i < depth; i++)
                    if (!type.isAssignable(arg[i], depth - 1))
                        return false;
            }
            else {
                for (let i = 0; i < arg.length && i < depth; i++)
                    if (!type.is(arg[i], depth - 1))
                        return false;
            }
            return true;
        }
        scalar(arg, type, longType) {
            let argType = typeof arg;
            switch (type) {
                case ScalarType.UINT64:
                case ScalarType.FIXED64:
                case ScalarType.INT64:
                case ScalarType.SFIXED64:
                case ScalarType.SINT64:
                    switch (longType) {
                        case LongType.BIGINT:
                            return argType == "bigint";
                        case LongType.NUMBER:
                            return argType == "number" && !isNaN(arg);
                        default:
                            return argType == "string";
                    }
                case ScalarType.BOOL:
                    return argType == 'boolean';
                case ScalarType.STRING:
                    return argType == 'string';
                case ScalarType.BYTES:
                    return arg instanceof Uint8Array;
                case ScalarType.DOUBLE:
                case ScalarType.FLOAT:
                    return argType == 'number' && !isNaN(arg);
                default:
                    // case ScalarType.UINT32:
                    // case ScalarType.FIXED32:
                    // case ScalarType.INT32:
                    // case ScalarType.SINT32:
                    // case ScalarType.SFIXED32:
                    return argType == 'number' && Number.isInteger(arg);
            }
        }
        scalars(arg, type, depth, longType) {
            if (!Array.isArray(arg))
                return false;
            if (depth < 2)
                return true;
            if (Array.isArray(arg))
                for (let i = 0; i < arg.length && i < depth; i++)
                    if (!this.scalar(arg[i], type, longType))
                        return false;
            return true;
        }
        mapKeys(map, type, depth) {
            let keys = Object.keys(map);
            switch (type) {
                case ScalarType.INT32:
                case ScalarType.FIXED32:
                case ScalarType.SFIXED32:
                case ScalarType.SINT32:
                case ScalarType.UINT32:
                    return this.scalars(keys.slice(0, depth).map(k => parseInt(k)), type, depth);
                case ScalarType.BOOL:
                    return this.scalars(keys.slice(0, depth).map(k => k == 'true' ? true : k == 'false' ? false : k), type, depth);
                default:
                    return this.scalars(keys, type, depth, LongType.STRING);
            }
        }
    }

    /**
     * Utility method to convert a PbLong or PbUlong to a JavaScript
     * representation during runtime.
     *
     * Works with generated field information, `undefined` is equivalent
     * to `STRING`.
     */
    function reflectionLongConvert(long, type) {
        switch (type) {
            case LongType.BIGINT:
                return long.toBigInt();
            case LongType.NUMBER:
                return long.toNumber();
            default:
                // case undefined:
                // case LongType.STRING:
                return long.toString();
        }
    }

    /**
     * Reads proto3 messages in canonical JSON format using reflection information.
     *
     * https://developers.google.com/protocol-buffers/docs/proto3#json
     */
    class ReflectionJsonReader {
        constructor(info) {
            this.info = info;
        }
        prepare() {
            var _a;
            if (this.fMap === undefined) {
                this.fMap = {};
                const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
                for (const field of fieldsInput) {
                    this.fMap[field.name] = field;
                    this.fMap[field.jsonName] = field;
                    this.fMap[field.localName] = field;
                }
            }
        }
        // Cannot parse JSON <type of jsonValue> for <type name>#<fieldName>.
        assert(condition, fieldName, jsonValue) {
            if (!condition) {
                let what = typeofJsonValue(jsonValue);
                if (what == "number" || what == "boolean")
                    what = jsonValue.toString();
                throw new Error(`Cannot parse JSON ${what} for ${this.info.typeName}#${fieldName}`);
            }
        }
        /**
         * Reads a message from canonical JSON format into the target message.
         *
         * Repeated fields are appended. Map entries are added, overwriting
         * existing keys.
         *
         * If a message field is already present, it will be merged with the
         * new data.
         */
        read(input, message, options) {
            this.prepare();
            const oneofsHandled = [];
            for (const [jsonKey, jsonValue] of Object.entries(input)) {
                const field = this.fMap[jsonKey];
                if (!field) {
                    if (!options.ignoreUnknownFields)
                        throw new Error(`Found unknown field while reading ${this.info.typeName} from JSON format. JSON key: ${jsonKey}`);
                    continue;
                }
                const localName = field.localName;
                // handle oneof ADT
                let target; // this will be the target for the field value, whether it is member of a oneof or not
                if (field.oneof) {
                    // since json objects are unordered by specification, it is not possible to take the last of multiple oneofs
                    if (oneofsHandled.includes(field.oneof))
                        throw new Error(`Multiple members of the oneof group "${field.oneof}" of ${this.info.typeName} are present in JSON.`);
                    oneofsHandled.push(field.oneof);
                    target = message[field.oneof] = {
                        oneofKind: localName
                    };
                }
                else {
                    target = message;
                }
                // we have handled oneof above. we just have read the value into `target`.
                if (field.kind == 'map') {
                    if (jsonValue === null) {
                        continue;
                    }
                    // check input
                    this.assert(isJsonObject(jsonValue), field.name, jsonValue);
                    // our target to put map entries into
                    const fieldObj = target[localName];
                    // read entries
                    for (const [jsonObjKey, jsonObjValue] of Object.entries(jsonValue)) {
                        this.assert(jsonObjValue !== null, field.name + " map value", null);
                        // read value
                        let val;
                        switch (field.V.kind) {
                            case "message":
                                val = field.V.T().internalJsonRead(jsonObjValue, options);
                                break;
                            case "enum":
                                val = this.enum(field.V.T(), jsonObjValue, field.name, options.ignoreUnknownFields);
                                if (val === false)
                                    continue;
                                break;
                            case "scalar":
                                val = this.scalar(jsonObjValue, field.V.T, field.V.L, field.name);
                                break;
                        }
                        this.assert(val !== undefined, field.name + " map value", jsonObjValue);
                        // read key
                        let key = jsonObjKey;
                        if (field.K == ScalarType.BOOL)
                            key = key == "true" ? true : key == "false" ? false : key;
                        key = this.scalar(key, field.K, LongType.STRING, field.name).toString();
                        fieldObj[key] = val;
                    }
                }
                else if (field.repeat) {
                    if (jsonValue === null)
                        continue;
                    // check input
                    this.assert(Array.isArray(jsonValue), field.name, jsonValue);
                    // our target to put array entries into
                    const fieldArr = target[localName];
                    // read array entries
                    for (const jsonItem of jsonValue) {
                        this.assert(jsonItem !== null, field.name, null);
                        let val;
                        switch (field.kind) {
                            case "message":
                                val = field.T().internalJsonRead(jsonItem, options);
                                break;
                            case "enum":
                                val = this.enum(field.T(), jsonItem, field.name, options.ignoreUnknownFields);
                                if (val === false)
                                    continue;
                                break;
                            case "scalar":
                                val = this.scalar(jsonItem, field.T, field.L, field.name);
                                break;
                        }
                        this.assert(val !== undefined, field.name, jsonValue);
                        fieldArr.push(val);
                    }
                }
                else {
                    switch (field.kind) {
                        case "message":
                            if (jsonValue === null && field.T().typeName != 'google.protobuf.Value') {
                                this.assert(field.oneof === undefined, field.name + " (oneof member)", null);
                                continue;
                            }
                            target[localName] = field.T().internalJsonRead(jsonValue, options, target[localName]);
                            break;
                        case "enum":
                            let val = this.enum(field.T(), jsonValue, field.name, options.ignoreUnknownFields);
                            if (val === false)
                                continue;
                            target[localName] = val;
                            break;
                        case "scalar":
                            target[localName] = this.scalar(jsonValue, field.T, field.L, field.name);
                            break;
                    }
                }
            }
        }
        /**
         * Returns `false` for unrecognized string representations.
         *
         * google.protobuf.NullValue accepts only JSON `null`.
         */
        enum(type, json, fieldName, ignoreUnknownFields) {
            if (type[0] == 'google.protobuf.NullValue')
                assert(json === null, `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} only accepts null.`);
            if (json === null)
                // we require 0 to be default value for all enums
                return 0;
            switch (typeof json) {
                case "number":
                    assert(Number.isInteger(json), `Unable to parse field ${this.info.typeName}#${fieldName}, enum can only be integral number, got ${json}.`);
                    return json;
                case "string":
                    let localEnumName = json;
                    if (type[2] && json.substring(0, type[2].length) === type[2])
                        // lookup without the shared prefix
                        localEnumName = json.substring(type[2].length);
                    let enumNumber = type[1][localEnumName];
                    if (typeof enumNumber === 'undefined' && ignoreUnknownFields) {
                        return false;
                    }
                    assert(typeof enumNumber == "number", `Unable to parse field ${this.info.typeName}#${fieldName}, enum ${type[0]} has no value for "${json}".`);
                    return enumNumber;
            }
            assert(false, `Unable to parse field ${this.info.typeName}#${fieldName}, cannot parse enum value from ${typeof json}".`);
        }
        scalar(json, type, longType, fieldName) {
            let e;
            try {
                switch (type) {
                    // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
                    // Either numbers or strings are accepted. Exponent notation is also accepted.
                    case ScalarType.DOUBLE:
                    case ScalarType.FLOAT:
                        if (json === null)
                            return .0;
                        if (json === "NaN")
                            return Number.NaN;
                        if (json === "Infinity")
                            return Number.POSITIVE_INFINITY;
                        if (json === "-Infinity")
                            return Number.NEGATIVE_INFINITY;
                        if (json === "") {
                            e = "empty string";
                            break;
                        }
                        if (typeof json == "string" && json.trim().length !== json.length) {
                            e = "extra whitespace";
                            break;
                        }
                        if (typeof json != "string" && typeof json != "number") {
                            break;
                        }
                        let float = Number(json);
                        if (Number.isNaN(float)) {
                            e = "not a number";
                            break;
                        }
                        if (!Number.isFinite(float)) {
                            // infinity and -infinity are handled by string representation above, so this is an error
                            e = "too large or small";
                            break;
                        }
                        if (type == ScalarType.FLOAT)
                            assertFloat32(float);
                        return float;
                    // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
                    case ScalarType.INT32:
                    case ScalarType.FIXED32:
                    case ScalarType.SFIXED32:
                    case ScalarType.SINT32:
                    case ScalarType.UINT32:
                        if (json === null)
                            return 0;
                        let int32;
                        if (typeof json == "number")
                            int32 = json;
                        else if (json === "")
                            e = "empty string";
                        else if (typeof json == "string") {
                            if (json.trim().length !== json.length)
                                e = "extra whitespace";
                            else
                                int32 = Number(json);
                        }
                        if (int32 === undefined)
                            break;
                        if (type == ScalarType.UINT32)
                            assertUInt32(int32);
                        else
                            assertInt32(int32);
                        return int32;
                    // int64, fixed64, uint64: JSON value will be a decimal string. Either numbers or strings are accepted.
                    case ScalarType.INT64:
                    case ScalarType.SFIXED64:
                    case ScalarType.SINT64:
                        if (json === null)
                            return reflectionLongConvert(PbLong.ZERO, longType);
                        if (typeof json != "number" && typeof json != "string")
                            break;
                        return reflectionLongConvert(PbLong.from(json), longType);
                    case ScalarType.FIXED64:
                    case ScalarType.UINT64:
                        if (json === null)
                            return reflectionLongConvert(PbULong.ZERO, longType);
                        if (typeof json != "number" && typeof json != "string")
                            break;
                        return reflectionLongConvert(PbULong.from(json), longType);
                    // bool:
                    case ScalarType.BOOL:
                        if (json === null)
                            return false;
                        if (typeof json !== "boolean")
                            break;
                        return json;
                    // string:
                    case ScalarType.STRING:
                        if (json === null)
                            return "";
                        if (typeof json !== "string") {
                            e = "extra whitespace";
                            break;
                        }
                        try {
                            encodeURIComponent(json);
                        }
                        catch (e) {
                            e = "invalid UTF8";
                            break;
                        }
                        return json;
                    // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
                    // Either standard or URL-safe base64 encoding with/without paddings are accepted.
                    case ScalarType.BYTES:
                        if (json === null || json === "")
                            return new Uint8Array(0);
                        if (typeof json !== 'string')
                            break;
                        return base64decode(json);
                }
            }
            catch (error) {
                e = error.message;
            }
            this.assert(false, fieldName + (e ? " - " + e : ""), json);
        }
    }

    /**
     * Writes proto3 messages in canonical JSON format using reflection
     * information.
     *
     * https://developers.google.com/protocol-buffers/docs/proto3#json
     */
    class ReflectionJsonWriter {
        constructor(info) {
            var _a;
            this.fields = (_a = info.fields) !== null && _a !== void 0 ? _a : [];
        }
        /**
         * Converts the message to a JSON object, based on the field descriptors.
         */
        write(message, options) {
            const json = {}, source = message;
            for (const field of this.fields) {
                // field is not part of a oneof, simply write as is
                if (!field.oneof) {
                    let jsonValue = this.field(field, source[field.localName], options);
                    if (jsonValue !== undefined)
                        json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
                    continue;
                }
                // field is part of a oneof
                const group = source[field.oneof];
                if (group.oneofKind !== field.localName)
                    continue; // not selected, skip
                const opt = field.kind == 'scalar' || field.kind == 'enum'
                    ? Object.assign(Object.assign({}, options), { emitDefaultValues: true }) : options;
                let jsonValue = this.field(field, group[field.localName], opt);
                assert(jsonValue !== undefined);
                json[options.useProtoFieldName ? field.name : field.jsonName] = jsonValue;
            }
            return json;
        }
        field(field, value, options) {
            let jsonValue = undefined;
            if (field.kind == 'map') {
                assert(typeof value == "object" && value !== null);
                const jsonObj = {};
                switch (field.V.kind) {
                    case "scalar":
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            const val = this.scalar(field.V.T, entryValue, field.name, false, true);
                            assert(val !== undefined);
                            jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                        }
                        break;
                    case "message":
                        const messageType = field.V.T();
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            const val = this.message(messageType, entryValue, field.name, options);
                            assert(val !== undefined);
                            jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                        }
                        break;
                    case "enum":
                        const enumInfo = field.V.T();
                        for (const [entryKey, entryValue] of Object.entries(value)) {
                            assert(entryValue === undefined || typeof entryValue == 'number');
                            const val = this.enum(enumInfo, entryValue, field.name, false, true, options.enumAsInteger);
                            assert(val !== undefined);
                            jsonObj[entryKey.toString()] = val; // JSON standard allows only (double quoted) string as property key
                        }
                        break;
                }
                if (options.emitDefaultValues || Object.keys(jsonObj).length > 0)
                    jsonValue = jsonObj;
            }
            else if (field.repeat) {
                assert(Array.isArray(value));
                const jsonArr = [];
                switch (field.kind) {
                    case "scalar":
                        for (let i = 0; i < value.length; i++) {
                            const val = this.scalar(field.T, value[i], field.name, field.opt, true);
                            assert(val !== undefined);
                            jsonArr.push(val);
                        }
                        break;
                    case "enum":
                        const enumInfo = field.T();
                        for (let i = 0; i < value.length; i++) {
                            assert(value[i] === undefined || typeof value[i] == 'number');
                            const val = this.enum(enumInfo, value[i], field.name, field.opt, true, options.enumAsInteger);
                            assert(val !== undefined);
                            jsonArr.push(val);
                        }
                        break;
                    case "message":
                        const messageType = field.T();
                        for (let i = 0; i < value.length; i++) {
                            const val = this.message(messageType, value[i], field.name, options);
                            assert(val !== undefined);
                            jsonArr.push(val);
                        }
                        break;
                }
                // add converted array to json output
                if (options.emitDefaultValues || jsonArr.length > 0 || options.emitDefaultValues)
                    jsonValue = jsonArr;
            }
            else {
                switch (field.kind) {
                    case "scalar":
                        jsonValue = this.scalar(field.T, value, field.name, field.opt, options.emitDefaultValues);
                        break;
                    case "enum":
                        jsonValue = this.enum(field.T(), value, field.name, field.opt, options.emitDefaultValues, options.enumAsInteger);
                        break;
                    case "message":
                        jsonValue = this.message(field.T(), value, field.name, options);
                        break;
                }
            }
            return jsonValue;
        }
        /**
         * Returns `null` for google.protobuf.NullValue.
         */
        enum(type, value, fieldName, optional, emitDefaultValues, enumAsInteger) {
            if (type[0] == 'google.protobuf.NullValue')
                return null;
            if (value === undefined) {
                assert(optional);
                return undefined;
            }
            if (value === 0 && !emitDefaultValues && !optional)
                // we require 0 to be default value for all enums
                return undefined;
            assert(typeof value == 'number');
            assert(Number.isInteger(value));
            if (enumAsInteger || !type[1].hasOwnProperty(value))
                // if we don't now the enum value, just return the number
                return value;
            if (type[2])
                // restore the dropped prefix
                return type[2] + type[1][value];
            return type[1][value];
        }
        message(type, value, fieldName, options) {
            if (value === undefined)
                return options.emitDefaultValues ? null : undefined;
            return type.internalJsonWrite(value, options);
        }
        scalar(type, value, fieldName, optional, emitDefaultValues) {
            if (value === undefined) {
                assert(optional);
                return undefined;
            }
            const ed = emitDefaultValues || optional;
            // noinspection FallThroughInSwitchStatementJS
            switch (type) {
                // int32, fixed32, uint32: JSON value will be a decimal number. Either numbers or strings are accepted.
                case ScalarType.INT32:
                case ScalarType.SFIXED32:
                case ScalarType.SINT32:
                    if (value === 0)
                        return ed ? 0 : undefined;
                    assertInt32(value);
                    return value;
                case ScalarType.FIXED32:
                case ScalarType.UINT32:
                    if (value === 0)
                        return ed ? 0 : undefined;
                    assertUInt32(value);
                    return value;
                // float, double: JSON value will be a number or one of the special string values "NaN", "Infinity", and "-Infinity".
                // Either numbers or strings are accepted. Exponent notation is also accepted.
                case ScalarType.FLOAT:
                    assertFloat32(value);
                case ScalarType.DOUBLE:
                    if (value === 0)
                        return ed ? 0 : undefined;
                    assert(typeof value == 'number');
                    if (Number.isNaN(value))
                        return 'NaN';
                    if (value === Number.POSITIVE_INFINITY)
                        return 'Infinity';
                    if (value === Number.NEGATIVE_INFINITY)
                        return '-Infinity';
                    return value;
                // string:
                case ScalarType.STRING:
                    if (value === "")
                        return ed ? '' : undefined;
                    assert(typeof value == 'string');
                    return value;
                // bool:
                case ScalarType.BOOL:
                    if (value === false)
                        return ed ? false : undefined;
                    assert(typeof value == 'boolean');
                    return value;
                // JSON value will be a decimal string. Either numbers or strings are accepted.
                case ScalarType.UINT64:
                case ScalarType.FIXED64:
                    assert(typeof value == 'number' || typeof value == 'string' || typeof value == 'bigint');
                    let ulong = PbULong.from(value);
                    if (ulong.isZero() && !ed)
                        return undefined;
                    return ulong.toString();
                // JSON value will be a decimal string. Either numbers or strings are accepted.
                case ScalarType.INT64:
                case ScalarType.SFIXED64:
                case ScalarType.SINT64:
                    assert(typeof value == 'number' || typeof value == 'string' || typeof value == 'bigint');
                    let long = PbLong.from(value);
                    if (long.isZero() && !ed)
                        return undefined;
                    return long.toString();
                // bytes: JSON value will be the data encoded as a string using standard base64 encoding with paddings.
                // Either standard or URL-safe base64 encoding with/without paddings are accepted.
                case ScalarType.BYTES:
                    assert(value instanceof Uint8Array);
                    if (!value.byteLength)
                        return ed ? "" : undefined;
                    return base64encode(value);
            }
        }
    }

    /**
     * Creates the default value for a scalar type.
     */
    function reflectionScalarDefault(type, longType = LongType.STRING) {
        switch (type) {
            case ScalarType.BOOL:
                return false;
            case ScalarType.UINT64:
            case ScalarType.FIXED64:
                return reflectionLongConvert(PbULong.ZERO, longType);
            case ScalarType.INT64:
            case ScalarType.SFIXED64:
            case ScalarType.SINT64:
                return reflectionLongConvert(PbLong.ZERO, longType);
            case ScalarType.DOUBLE:
            case ScalarType.FLOAT:
                return 0.0;
            case ScalarType.BYTES:
                return new Uint8Array(0);
            case ScalarType.STRING:
                return "";
            default:
                // case ScalarType.INT32:
                // case ScalarType.UINT32:
                // case ScalarType.SINT32:
                // case ScalarType.FIXED32:
                // case ScalarType.SFIXED32:
                return 0;
        }
    }

    /**
     * Reads proto3 messages in binary format using reflection information.
     *
     * https://developers.google.com/protocol-buffers/docs/encoding
     */
    class ReflectionBinaryReader {
        constructor(info) {
            this.info = info;
        }
        prepare() {
            var _a;
            if (!this.fieldNoToField) {
                const fieldsInput = (_a = this.info.fields) !== null && _a !== void 0 ? _a : [];
                this.fieldNoToField = new Map(fieldsInput.map(field => [field.no, field]));
            }
        }
        /**
         * Reads a message from binary format into the target message.
         *
         * Repeated fields are appended. Map entries are added, overwriting
         * existing keys.
         *
         * If a message field is already present, it will be merged with the
         * new data.
         */
        read(reader, message, options, length) {
            this.prepare();
            const end = length === undefined ? reader.len : reader.pos + length;
            while (reader.pos < end) {
                // read the tag and find the field
                const [fieldNo, wireType] = reader.tag(), field = this.fieldNoToField.get(fieldNo);
                if (!field) {
                    let u = options.readUnknownField;
                    if (u == "throw")
                        throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.info.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.info.typeName, message, fieldNo, wireType, d);
                    continue;
                }
                // target object for the field we are reading
                let target = message, repeated = field.repeat, localName = field.localName;
                // if field is member of oneof ADT, use ADT as target
                if (field.oneof) {
                    target = target[field.oneof];
                    // if other oneof member selected, set new ADT
                    if (target.oneofKind !== localName)
                        target = message[field.oneof] = {
                            oneofKind: localName
                        };
                }
                // we have handled oneof above, we just have read the value into `target[localName]`
                switch (field.kind) {
                    case "scalar":
                    case "enum":
                        let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
                        let L = field.kind == "scalar" ? field.L : undefined;
                        if (repeated) {
                            let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
                            if (wireType == WireType.LengthDelimited && T != ScalarType.STRING && T != ScalarType.BYTES) {
                                let e = reader.uint32() + reader.pos;
                                while (reader.pos < e)
                                    arr.push(this.scalar(reader, T, L));
                            }
                            else
                                arr.push(this.scalar(reader, T, L));
                        }
                        else
                            target[localName] = this.scalar(reader, T, L);
                        break;
                    case "message":
                        if (repeated) {
                            let arr = target[localName]; // safe to assume presence of array, oneof cannot contain repeated values
                            let msg = field.T().internalBinaryRead(reader, reader.uint32(), options);
                            arr.push(msg);
                        }
                        else
                            target[localName] = field.T().internalBinaryRead(reader, reader.uint32(), options, target[localName]);
                        break;
                    case "map":
                        let [mapKey, mapVal] = this.mapEntry(field, reader, options);
                        // safe to assume presence of map object, oneof cannot contain repeated values
                        target[localName][mapKey] = mapVal;
                        break;
                }
            }
        }
        /**
         * Read a map field, expecting key field = 1, value field = 2
         */
        mapEntry(field, reader, options) {
            let length = reader.uint32();
            let end = reader.pos + length;
            let key = undefined; // javascript only allows number or string for object properties
            let val = undefined;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case 1:
                        if (field.K == ScalarType.BOOL)
                            key = reader.bool().toString();
                        else
                            // long types are read as string, number types are okay as number
                            key = this.scalar(reader, field.K, LongType.STRING);
                        break;
                    case 2:
                        switch (field.V.kind) {
                            case "scalar":
                                val = this.scalar(reader, field.V.T, field.V.L);
                                break;
                            case "enum":
                                val = reader.int32();
                                break;
                            case "message":
                                val = field.V.T().internalBinaryRead(reader, reader.uint32(), options);
                                break;
                        }
                        break;
                    default:
                        throw new Error(`Unknown field ${fieldNo} (wire type ${wireType}) in map entry for ${this.info.typeName}#${field.name}`);
                }
            }
            if (key === undefined) {
                let keyRaw = reflectionScalarDefault(field.K);
                key = field.K == ScalarType.BOOL ? keyRaw.toString() : keyRaw;
            }
            if (val === undefined)
                switch (field.V.kind) {
                    case "scalar":
                        val = reflectionScalarDefault(field.V.T, field.V.L);
                        break;
                    case "enum":
                        val = 0;
                        break;
                    case "message":
                        val = field.V.T().create();
                        break;
                }
            return [key, val];
        }
        scalar(reader, type, longType) {
            switch (type) {
                case ScalarType.INT32:
                    return reader.int32();
                case ScalarType.STRING:
                    return reader.string();
                case ScalarType.BOOL:
                    return reader.bool();
                case ScalarType.DOUBLE:
                    return reader.double();
                case ScalarType.FLOAT:
                    return reader.float();
                case ScalarType.INT64:
                    return reflectionLongConvert(reader.int64(), longType);
                case ScalarType.UINT64:
                    return reflectionLongConvert(reader.uint64(), longType);
                case ScalarType.FIXED64:
                    return reflectionLongConvert(reader.fixed64(), longType);
                case ScalarType.FIXED32:
                    return reader.fixed32();
                case ScalarType.BYTES:
                    return reader.bytes();
                case ScalarType.UINT32:
                    return reader.uint32();
                case ScalarType.SFIXED32:
                    return reader.sfixed32();
                case ScalarType.SFIXED64:
                    return reflectionLongConvert(reader.sfixed64(), longType);
                case ScalarType.SINT32:
                    return reader.sint32();
                case ScalarType.SINT64:
                    return reflectionLongConvert(reader.sint64(), longType);
            }
        }
    }

    /**
     * Writes proto3 messages in binary format using reflection information.
     *
     * https://developers.google.com/protocol-buffers/docs/encoding
     */
    class ReflectionBinaryWriter {
        constructor(info) {
            this.info = info;
        }
        prepare() {
            if (!this.fields) {
                const fieldsInput = this.info.fields ? this.info.fields.concat() : [];
                this.fields = fieldsInput.sort((a, b) => a.no - b.no);
            }
        }
        /**
         * Writes the message to binary format.
         */
        write(message, writer, options) {
            this.prepare();
            for (const field of this.fields) {
                let value, // this will be our field value, whether it is member of a oneof or not
                emitDefault, // whether we emit the default value (only true for oneof members)
                repeated = field.repeat, localName = field.localName;
                // handle oneof ADT
                if (field.oneof) {
                    const group = message[field.oneof];
                    if (group.oneofKind !== localName)
                        continue; // if field is not selected, skip
                    value = group[localName];
                    emitDefault = true;
                }
                else {
                    value = message[localName];
                    emitDefault = false;
                }
                // we have handled oneof above. we just have to honor `emitDefault`.
                switch (field.kind) {
                    case "scalar":
                    case "enum":
                        let T = field.kind == "enum" ? ScalarType.INT32 : field.T;
                        if (repeated) {
                            assert(Array.isArray(value));
                            if (repeated == RepeatType.PACKED)
                                this.packed(writer, T, field.no, value);
                            else
                                for (const item of value)
                                    this.scalar(writer, T, field.no, item, true);
                        }
                        else if (value === undefined)
                            assert(field.opt);
                        else
                            this.scalar(writer, T, field.no, value, emitDefault || field.opt);
                        break;
                    case "message":
                        if (repeated) {
                            assert(Array.isArray(value));
                            for (const item of value)
                                this.message(writer, options, field.T(), field.no, item);
                        }
                        else {
                            this.message(writer, options, field.T(), field.no, value);
                        }
                        break;
                    case "map":
                        assert(typeof value == 'object' && value !== null);
                        for (const [key, val] of Object.entries(value))
                            this.mapEntry(writer, options, field, key, val);
                        break;
                }
            }
            let u = options.writeUnknownFields;
            if (u !== false)
                (u === true ? UnknownFieldHandler.onWrite : u)(this.info.typeName, message, writer);
        }
        mapEntry(writer, options, field, key, value) {
            writer.tag(field.no, WireType.LengthDelimited);
            writer.fork();
            // javascript only allows number or string for object properties
            // we convert from our representation to the protobuf type
            let keyValue = key;
            switch (field.K) {
                case ScalarType.INT32:
                case ScalarType.FIXED32:
                case ScalarType.UINT32:
                case ScalarType.SFIXED32:
                case ScalarType.SINT32:
                    keyValue = Number.parseInt(key);
                    break;
                case ScalarType.BOOL:
                    assert(key == 'true' || key == 'false');
                    keyValue = key == 'true';
                    break;
            }
            // write key, expecting key field number = 1
            this.scalar(writer, field.K, 1, keyValue, true);
            // write value, expecting value field number = 2
            switch (field.V.kind) {
                case 'scalar':
                    this.scalar(writer, field.V.T, 2, value, true);
                    break;
                case 'enum':
                    this.scalar(writer, ScalarType.INT32, 2, value, true);
                    break;
                case 'message':
                    this.message(writer, options, field.V.T(), 2, value);
                    break;
            }
            writer.join();
        }
        message(writer, options, handler, fieldNo, value) {
            if (value === undefined)
                return;
            handler.internalBinaryWrite(value, writer.tag(fieldNo, WireType.LengthDelimited).fork(), options);
            writer.join();
        }
        /**
         * Write a single scalar value.
         */
        scalar(writer, type, fieldNo, value, emitDefault) {
            let [wireType, method, isDefault] = this.scalarInfo(type, value);
            if (!isDefault || emitDefault) {
                writer.tag(fieldNo, wireType);
                writer[method](value);
            }
        }
        /**
         * Write an array of scalar values in packed format.
         */
        packed(writer, type, fieldNo, value) {
            if (!value.length)
                return;
            assert(type !== ScalarType.BYTES && type !== ScalarType.STRING);
            // write tag
            writer.tag(fieldNo, WireType.LengthDelimited);
            // begin length-delimited
            writer.fork();
            // write values without tags
            let [, method,] = this.scalarInfo(type);
            for (let i = 0; i < value.length; i++)
                writer[method](value[i]);
            // end length delimited
            writer.join();
        }
        /**
         * Get information for writing a scalar value.
         *
         * Returns tuple:
         * [0]: appropriate WireType
         * [1]: name of the appropriate method of IBinaryWriter
         * [2]: whether the given value is a default value
         *
         * If argument `value` is omitted, [2] is always false.
         */
        scalarInfo(type, value) {
            let t = WireType.Varint;
            let m;
            let i = value === undefined;
            let d = value === 0;
            switch (type) {
                case ScalarType.INT32:
                    m = "int32";
                    break;
                case ScalarType.STRING:
                    d = i || !value.length;
                    t = WireType.LengthDelimited;
                    m = "string";
                    break;
                case ScalarType.BOOL:
                    d = value === false;
                    m = "bool";
                    break;
                case ScalarType.UINT32:
                    m = "uint32";
                    break;
                case ScalarType.DOUBLE:
                    t = WireType.Bit64;
                    m = "double";
                    break;
                case ScalarType.FLOAT:
                    t = WireType.Bit32;
                    m = "float";
                    break;
                case ScalarType.INT64:
                    d = i || PbLong.from(value).isZero();
                    m = "int64";
                    break;
                case ScalarType.UINT64:
                    d = i || PbULong.from(value).isZero();
                    m = "uint64";
                    break;
                case ScalarType.FIXED64:
                    d = i || PbULong.from(value).isZero();
                    t = WireType.Bit64;
                    m = "fixed64";
                    break;
                case ScalarType.BYTES:
                    d = i || !value.byteLength;
                    t = WireType.LengthDelimited;
                    m = "bytes";
                    break;
                case ScalarType.FIXED32:
                    t = WireType.Bit32;
                    m = "fixed32";
                    break;
                case ScalarType.SFIXED32:
                    t = WireType.Bit32;
                    m = "sfixed32";
                    break;
                case ScalarType.SFIXED64:
                    d = i || PbLong.from(value).isZero();
                    t = WireType.Bit64;
                    m = "sfixed64";
                    break;
                case ScalarType.SINT32:
                    m = "sint32";
                    break;
                case ScalarType.SINT64:
                    d = i || PbLong.from(value).isZero();
                    m = "sint64";
                    break;
            }
            return [t, m, i || d];
        }
    }

    /**
     * Creates an instance of the generic message, using the field
     * information.
     */
    function reflectionCreate(type) {
        const msg = {};
        Object.defineProperty(msg, MESSAGE_TYPE, { enumerable: false, value: type });
        for (let field of type.fields) {
            let name = field.localName;
            if (field.opt)
                continue;
            if (field.oneof)
                msg[field.oneof] = { oneofKind: undefined };
            else if (field.repeat)
                msg[name] = [];
            else
                switch (field.kind) {
                    case "scalar":
                        msg[name] = reflectionScalarDefault(field.T, field.L);
                        break;
                    case "enum":
                        // we require 0 to be default value for all enums
                        msg[name] = 0;
                        break;
                    case "map":
                        msg[name] = {};
                        break;
                }
        }
        return msg;
    }

    /**
     * Copy partial data into the target message.
     *
     * If a singular scalar or enum field is present in the source, it
     * replaces the field in the target.
     *
     * If a singular message field is present in the source, it is merged
     * with the target field by calling mergePartial() of the responsible
     * message type.
     *
     * If a repeated field is present in the source, its values replace
     * all values in the target array, removing extraneous values.
     * Repeated message fields are copied, not merged.
     *
     * If a map field is present in the source, entries are added to the
     * target map, replacing entries with the same key. Entries that only
     * exist in the target remain. Entries with message values are copied,
     * not merged.
     *
     * Note that this function differs from protobuf merge semantics,
     * which appends repeated fields.
     */
    function reflectionMergePartial(info, target, source) {
        let fieldValue, // the field value we are working with
        input = source, output; // where we want our field value to go
        for (let field of info.fields) {
            let name = field.localName;
            if (field.oneof) {
                const group = input[field.oneof]; // this is the oneof`s group in the source
                if ((group === null || group === void 0 ? void 0 : group.oneofKind) == undefined) { // the user is free to omit
                    continue; // we skip this field, and all other members too
                }
                fieldValue = group[name]; // our value comes from the the oneof group of the source
                output = target[field.oneof]; // and our output is the oneof group of the target
                output.oneofKind = group.oneofKind; // always update discriminator
                if (fieldValue == undefined) {
                    delete output[name]; // remove any existing value
                    continue; // skip further work on field
                }
            }
            else {
                fieldValue = input[name]; // we are using the source directly
                output = target; // we want our field value to go directly into the target
                if (fieldValue == undefined) {
                    continue; // skip further work on field, existing value is used as is
                }
            }
            if (field.repeat)
                output[name].length = fieldValue.length; // resize target array to match source array
            // now we just work with `fieldValue` and `output` to merge the value
            switch (field.kind) {
                case "scalar":
                case "enum":
                    if (field.repeat)
                        for (let i = 0; i < fieldValue.length; i++)
                            output[name][i] = fieldValue[i]; // not a reference type
                    else
                        output[name] = fieldValue; // not a reference type
                    break;
                case "message":
                    let T = field.T();
                    if (field.repeat)
                        for (let i = 0; i < fieldValue.length; i++)
                            output[name][i] = T.create(fieldValue[i]);
                    else if (output[name] === undefined)
                        output[name] = T.create(fieldValue); // nothing to merge with
                    else
                        T.mergePartial(output[name], fieldValue);
                    break;
                case "map":
                    // Map and repeated fields are simply overwritten, not appended or merged
                    switch (field.V.kind) {
                        case "scalar":
                        case "enum":
                            Object.assign(output[name], fieldValue); // elements are not reference types
                            break;
                        case "message":
                            let T = field.V.T();
                            for (let k of Object.keys(fieldValue))
                                output[name][k] = T.create(fieldValue[k]);
                            break;
                    }
                    break;
            }
        }
    }

    /**
     * Determines whether two message of the same type have the same field values.
     * Checks for deep equality, traversing repeated fields, oneof groups, maps
     * and messages recursively.
     * Will also return true if both messages are `undefined`.
     */
    function reflectionEquals(info, a, b) {
        if (a === b)
            return true;
        if (!a || !b)
            return false;
        for (let field of info.fields) {
            let localName = field.localName;
            let val_a = field.oneof ? a[field.oneof][localName] : a[localName];
            let val_b = field.oneof ? b[field.oneof][localName] : b[localName];
            switch (field.kind) {
                case "enum":
                case "scalar":
                    let t = field.kind == "enum" ? ScalarType.INT32 : field.T;
                    if (!(field.repeat
                        ? repeatedPrimitiveEq(t, val_a, val_b)
                        : primitiveEq(t, val_a, val_b)))
                        return false;
                    break;
                case "map":
                    if (!(field.V.kind == "message"
                        ? repeatedMsgEq(field.V.T(), objectValues(val_a), objectValues(val_b))
                        : repeatedPrimitiveEq(field.V.kind == "enum" ? ScalarType.INT32 : field.V.T, objectValues(val_a), objectValues(val_b))))
                        return false;
                    break;
                case "message":
                    let T = field.T();
                    if (!(field.repeat
                        ? repeatedMsgEq(T, val_a, val_b)
                        : T.equals(val_a, val_b)))
                        return false;
                    break;
            }
        }
        return true;
    }
    const objectValues = Object.values;
    function primitiveEq(type, a, b) {
        if (a === b)
            return true;
        if (type !== ScalarType.BYTES)
            return false;
        let ba = a;
        let bb = b;
        if (ba.length !== bb.length)
            return false;
        for (let i = 0; i < ba.length; i++)
            if (ba[i] != bb[i])
                return false;
        return true;
    }
    function repeatedPrimitiveEq(type, a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (!primitiveEq(type, a[i], b[i]))
                return false;
        return true;
    }
    function repeatedMsgEq(type, a, b) {
        if (a.length !== b.length)
            return false;
        for (let i = 0; i < a.length; i++)
            if (!type.equals(a[i], b[i]))
                return false;
        return true;
    }

    /**
     * This standard message type provides reflection-based
     * operations to work with a message.
     */
    class MessageType {
        constructor(name, fields, options) {
            this.defaultCheckDepth = 16;
            this.typeName = name;
            this.fields = fields.map(normalizeFieldInfo);
            this.options = options !== null && options !== void 0 ? options : {};
            this.refTypeCheck = new ReflectionTypeCheck(this);
            this.refJsonReader = new ReflectionJsonReader(this);
            this.refJsonWriter = new ReflectionJsonWriter(this);
            this.refBinReader = new ReflectionBinaryReader(this);
            this.refBinWriter = new ReflectionBinaryWriter(this);
        }
        create(value) {
            let message = reflectionCreate(this);
            if (value !== undefined) {
                reflectionMergePartial(this, message, value);
            }
            return message;
        }
        /**
         * Clone the message.
         *
         * Unknown fields are discarded.
         */
        clone(message) {
            let copy = this.create();
            reflectionMergePartial(this, copy, message);
            return copy;
        }
        /**
         * Determines whether two message of the same type have the same field values.
         * Checks for deep equality, traversing repeated fields, oneof groups, maps
         * and messages recursively.
         * Will also return true if both messages are `undefined`.
         */
        equals(a, b) {
            return reflectionEquals(this, a, b);
        }
        /**
         * Is the given value assignable to our message type
         * and contains no [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
         */
        is(arg, depth = this.defaultCheckDepth) {
            return this.refTypeCheck.is(arg, depth, false);
        }
        /**
         * Is the given value assignable to our message type,
         * regardless of [excess properties](https://www.typescriptlang.org/docs/handbook/interfaces.html#excess-property-checks)?
         */
        isAssignable(arg, depth = this.defaultCheckDepth) {
            return this.refTypeCheck.is(arg, depth, true);
        }
        /**
         * Copy partial data into the target message.
         */
        mergePartial(target, source) {
            reflectionMergePartial(this, target, source);
        }
        /**
         * Create a new message from binary format.
         */
        fromBinary(data, options) {
            let opt = binaryReadOptions(options);
            return this.internalBinaryRead(opt.readerFactory(data), data.byteLength, opt);
        }
        /**
         * Read a new message from a JSON value.
         */
        fromJson(json, options) {
            return this.internalJsonRead(json, jsonReadOptions(options));
        }
        /**
         * Read a new message from a JSON string.
         * This is equivalent to `T.fromJson(JSON.parse(json))`.
         */
        fromJsonString(json, options) {
            let value = JSON.parse(json);
            return this.fromJson(value, options);
        }
        /**
         * Write the message to canonical JSON value.
         */
        toJson(message, options) {
            return this.internalJsonWrite(message, jsonWriteOptions(options));
        }
        /**
         * Convert the message to canonical JSON string.
         * This is equivalent to `JSON.stringify(T.toJson(t))`
         */
        toJsonString(message, options) {
            var _a;
            let value = this.toJson(message, options);
            return JSON.stringify(value, null, (_a = options === null || options === void 0 ? void 0 : options.prettySpaces) !== null && _a !== void 0 ? _a : 0);
        }
        /**
         * Write the message to binary format.
         */
        toBinary(message, options) {
            let opt = binaryWriteOptions(options);
            return this.internalBinaryWrite(message, opt.writerFactory(), opt).finish();
        }
        /**
         * This is an internal method. If you just want to read a message from
         * JSON, use `fromJson()` or `fromJsonString()`.
         *
         * Reads JSON value and merges the fields into the target
         * according to protobuf rules. If the target is omitted,
         * a new instance is created first.
         */
        internalJsonRead(json, options, target) {
            if (json !== null && typeof json == "object" && !Array.isArray(json)) {
                let message = target !== null && target !== void 0 ? target : this.create();
                this.refJsonReader.read(json, message, options);
                return message;
            }
            throw new Error(`Unable to parse message ${this.typeName} from JSON ${typeofJsonValue(json)}.`);
        }
        /**
         * This is an internal method. If you just want to write a message
         * to JSON, use `toJson()` or `toJsonString().
         *
         * Writes JSON value and returns it.
         */
        internalJsonWrite(message, options) {
            return this.refJsonWriter.write(message, options);
        }
        /**
         * This is an internal method. If you just want to write a message
         * in binary format, use `toBinary()`.
         *
         * Serializes the message in binary format and appends it to the given
         * writer. Returns passed writer.
         */
        internalBinaryWrite(message, writer, options) {
            this.refBinWriter.write(message, writer, options);
            return writer;
        }
        /**
         * This is an internal method. If you just want to read a message from
         * binary data, use `fromBinary()`.
         *
         * Reads data from binary format and merges the fields into
         * the target according to protobuf rules. If the target is
         * omitted, a new instance is created first.
         */
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create();
            this.refBinReader.read(reader, message, options, length);
            return message;
        }
    }

    /**
     * Turns PartialMethodInfo into MethodInfo.
     */
    function normalizeMethodInfo(method, service) {
        var _a, _b, _c;
        let m = method;
        m.service = service;
        m.localName = (_a = m.localName) !== null && _a !== void 0 ? _a : lowerCamelCase(m.name);
        // noinspection PointlessBooleanExpressionJS
        m.serverStreaming = !!m.serverStreaming;
        // noinspection PointlessBooleanExpressionJS
        m.clientStreaming = !!m.clientStreaming;
        m.options = (_b = m.options) !== null && _b !== void 0 ? _b : {};
        m.idempotency = (_c = m.idempotency) !== null && _c !== void 0 ? _c : undefined;
        return m;
    }

    class ServiceType {
        constructor(typeName, methods, options) {
            this.typeName = typeName;
            this.methods = methods.map(i => normalizeMethodInfo(i, this));
            this.options = options !== null && options !== void 0 ? options : {};
        }
    }

    // @generated by protobuf-ts 2.2.3-alpha.1 with parameter client_none,generate_dependencies
    // @generated message type with reflection information, may provide speed optimized methods
    class LoginRequest$Type extends MessageType {
        constructor() {
            super("ctfg.LoginRequest", [
                { no: 1, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
                { no: 2, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { email: "", password: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string email */ 1:
                        message.email = reader.string();
                        break;
                    case /* string password */ 2:
                        message.password = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string email = 1; */
            if (message.email !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.email);
            /* string password = 2; */
            if (message.password !== "")
                writer.tag(2, WireType.LengthDelimited).string(message.password);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.LoginRequest
     */
    const LoginRequest = new LoginRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class LoginResponse$Type extends MessageType {
        constructor() {
            super("ctfg.LoginResponse", [
                { no: 1, name: "loggedIn", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
            ]);
        }
        create(value) {
            const message = { loggedIn: false };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* bool loggedIn */ 1:
                        message.loggedIn = reader.bool();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* bool loggedIn = 1; */
            if (message.loggedIn !== false)
                writer.tag(1, WireType.Varint).bool(message.loggedIn);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.LoginResponse
     */
    const LoginResponse = new LoginResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class Evidence$Type extends MessageType {
        constructor() {
            super("ctfg.Evidence", [
                { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
                { no: 2, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { id: 0, name: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* uint32 id */ 1:
                        message.id = reader.uint32();
                        break;
                    case /* string name */ 2:
                        message.name = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* uint32 id = 1; */
            if (message.id !== 0)
                writer.tag(1, WireType.Varint).uint32(message.id);
            /* string name = 2; */
            if (message.name !== "")
                writer.tag(2, WireType.LengthDelimited).string(message.name);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.Evidence
     */
    const Evidence$1 = new Evidence$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class Connection$Type extends MessageType {
        constructor() {
            super("ctfg.Connection", [
                { no: 1, name: "id", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
                { no: 2, name: "source", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
                { no: 3, name: "destination", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
            ]);
        }
        create(value) {
            const message = { id: 0, source: 0, destination: 0 };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* uint32 id */ 1:
                        message.id = reader.uint32();
                        break;
                    case /* uint32 source */ 2:
                        message.source = reader.uint32();
                        break;
                    case /* uint32 destination */ 3:
                        message.destination = reader.uint32();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* uint32 id = 1; */
            if (message.id !== 0)
                writer.tag(1, WireType.Varint).uint32(message.id);
            /* uint32 source = 2; */
            if (message.source !== 0)
                writer.tag(2, WireType.Varint).uint32(message.source);
            /* uint32 destination = 3; */
            if (message.destination !== 0)
                writer.tag(3, WireType.Varint).uint32(message.destination);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.Connection
     */
    const Connection = new Connection$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class GetDiscoveredEvidenceRequest$Type extends MessageType {
        constructor() {
            super("ctfg.GetDiscoveredEvidenceRequest", []);
        }
        create(value) {
            const message = {};
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            return target !== null && target !== void 0 ? target : this.create();
        }
        internalBinaryWrite(message, writer, options) {
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.GetDiscoveredEvidenceRequest
     */
    const GetDiscoveredEvidenceRequest = new GetDiscoveredEvidenceRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class GetDiscoveredEvidenceResponse$Type extends MessageType {
        constructor() {
            super("ctfg.GetDiscoveredEvidenceResponse", [
                { no: 1, name: "evidence", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Evidence$1 },
                { no: 2, name: "connections", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Connection }
            ]);
        }
        create(value) {
            const message = { evidence: [], connections: [] };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* repeated ctfg.Evidence evidence */ 1:
                        message.evidence.push(Evidence$1.internalBinaryRead(reader, reader.uint32(), options));
                        break;
                    case /* repeated ctfg.Connection connections */ 2:
                        message.connections.push(Connection.internalBinaryRead(reader, reader.uint32(), options));
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* repeated ctfg.Evidence evidence = 1; */
            for (let i = 0; i < message.evidence.length; i++)
                Evidence$1.internalBinaryWrite(message.evidence[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
            /* repeated ctfg.Connection connections = 2; */
            for (let i = 0; i < message.connections.length; i++)
                Connection.internalBinaryWrite(message.connections[i], writer.tag(2, WireType.LengthDelimited).fork(), options).join();
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.GetDiscoveredEvidenceResponse
     */
    const GetDiscoveredEvidenceResponse = new GetDiscoveredEvidenceResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitEvidenceRequest$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitEvidenceRequest", [
                { no: 1, name: "evidence", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { evidence: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string evidence */ 1:
                        message.evidence = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string evidence = 1; */
            if (message.evidence !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.evidence);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitEvidenceRequest
     */
    const SubmitEvidenceRequest = new SubmitEvidenceRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitEvidenceResponse$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitEvidenceResponse", [
                { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { name: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string name */ 1:
                        message.name = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string name = 1; */
            if (message.name !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.name);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitEvidenceResponse
     */
    const SubmitEvidenceResponse = new SubmitEvidenceResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitEvidenceConnectionRequest$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitEvidenceConnectionRequest", [
                { no: 1, name: "source", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
                { no: 2, name: "destination", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
            ]);
        }
        create(value) {
            const message = { source: 0, destination: 0 };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* uint32 source */ 1:
                        message.source = reader.uint32();
                        break;
                    case /* uint32 destination */ 2:
                        message.destination = reader.uint32();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* uint32 source = 1; */
            if (message.source !== 0)
                writer.tag(1, WireType.Varint).uint32(message.source);
            /* uint32 destination = 2; */
            if (message.destination !== 0)
                writer.tag(2, WireType.Varint).uint32(message.destination);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitEvidenceConnectionRequest
     */
    const SubmitEvidenceConnectionRequest = new SubmitEvidenceConnectionRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitEvidenceConnectionResponse$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitEvidenceConnectionResponse", [
                { no: 1, name: "created", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
            ]);
        }
        create(value) {
            const message = { created: false };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* bool created */ 1:
                        message.created = reader.bool();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* bool created = 1; */
            if (message.created !== false)
                writer.tag(1, WireType.Varint).bool(message.created);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitEvidenceConnectionResponse
     */
    const SubmitEvidenceConnectionResponse = new SubmitEvidenceConnectionResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class RegisterRequest$Type extends MessageType {
        constructor() {
            super("ctfg.RegisterRequest", [
                { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
                { no: 2, name: "email", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
                { no: 3, name: "password", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { username: "", email: "", password: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string username */ 1:
                        message.username = reader.string();
                        break;
                    case /* string email */ 2:
                        message.email = reader.string();
                        break;
                    case /* string password */ 3:
                        message.password = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string username = 1; */
            if (message.username !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.username);
            /* string email = 2; */
            if (message.email !== "")
                writer.tag(2, WireType.LengthDelimited).string(message.email);
            /* string password = 3; */
            if (message.password !== "")
                writer.tag(3, WireType.LengthDelimited).string(message.password);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.RegisterRequest
     */
    const RegisterRequest = new RegisterRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class RegisterResponse$Type extends MessageType {
        constructor() {
            super("ctfg.RegisterResponse", [
                { no: 1, name: "created", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
            ]);
        }
        create(value) {
            const message = { created: false };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* bool created */ 1:
                        message.created = reader.bool();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* bool created = 1; */
            if (message.created !== false)
                writer.tag(1, WireType.Varint).bool(message.created);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.RegisterResponse
     */
    const RegisterResponse = new RegisterResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class CurrentUserRequest$Type extends MessageType {
        constructor() {
            super("ctfg.CurrentUserRequest", []);
        }
        create(value) {
            const message = {};
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            return target !== null && target !== void 0 ? target : this.create();
        }
        internalBinaryWrite(message, writer, options) {
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.CurrentUserRequest
     */
    const CurrentUserRequest = new CurrentUserRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class CurrentUserResponse$Type extends MessageType {
        constructor() {
            super("ctfg.CurrentUserResponse", [
                { no: 1, name: "username", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { username: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string username */ 1:
                        message.username = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string username = 1; */
            if (message.username !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.username);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.CurrentUserResponse
     */
    const CurrentUserResponse = new CurrentUserResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class GetChallengesRequest$Type extends MessageType {
        constructor() {
            super("ctfg.GetChallengesRequest", []);
        }
        create(value) {
            const message = {};
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            return target !== null && target !== void 0 ? target : this.create();
        }
        internalBinaryWrite(message, writer, options) {
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.GetChallengesRequest
     */
    const GetChallengesRequest = new GetChallengesRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class Challenge$Type extends MessageType {
        constructor() {
            super("ctfg.Challenge", [
                { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
                { no: 2, name: "description", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
                { no: 3, name: "value", kind: "scalar", T: 5 /*ScalarType.INT32*/ }
            ]);
        }
        create(value) {
            const message = { name: "", description: "", value: 0 };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string name */ 1:
                        message.name = reader.string();
                        break;
                    case /* string description */ 2:
                        message.description = reader.string();
                        break;
                    case /* int32 value */ 3:
                        message.value = reader.int32();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string name = 1; */
            if (message.name !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.name);
            /* string description = 2; */
            if (message.description !== "")
                writer.tag(2, WireType.LengthDelimited).string(message.description);
            /* int32 value = 3; */
            if (message.value !== 0)
                writer.tag(3, WireType.Varint).int32(message.value);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.Challenge
     */
    const Challenge = new Challenge$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class GetChallengesResponse$Type extends MessageType {
        constructor() {
            super("ctfg.GetChallengesResponse", [
                { no: 1, name: "challenges", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => Challenge }
            ]);
        }
        create(value) {
            const message = { challenges: [] };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* repeated ctfg.Challenge challenges */ 1:
                        message.challenges.push(Challenge.internalBinaryRead(reader, reader.uint32(), options));
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* repeated ctfg.Challenge challenges = 1; */
            for (let i = 0; i < message.challenges.length; i++)
                Challenge.internalBinaryWrite(message.challenges[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.GetChallengesResponse
     */
    const GetChallengesResponse = new GetChallengesResponse$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitFlagRequest$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitFlagRequest", [
                { no: 1, name: "flag", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
            ]);
        }
        create(value) {
            const message = { flag: "" };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* string flag */ 1:
                        message.flag = reader.string();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* string flag = 1; */
            if (message.flag !== "")
                writer.tag(1, WireType.LengthDelimited).string(message.flag);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitFlagRequest
     */
    const SubmitFlagRequest = new SubmitFlagRequest$Type();
    // @generated message type with reflection information, may provide speed optimized methods
    class SubmitFlagResponse$Type extends MessageType {
        constructor() {
            super("ctfg.SubmitFlagResponse", [
                { no: 1, name: "correct", kind: "scalar", T: 8 /*ScalarType.BOOL*/ }
            ]);
        }
        create(value) {
            const message = { correct: false };
            globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
            if (value !== undefined)
                reflectionMergePartial(this, message, value);
            return message;
        }
        internalBinaryRead(reader, length, options, target) {
            let message = target !== null && target !== void 0 ? target : this.create(), end = reader.pos + length;
            while (reader.pos < end) {
                let [fieldNo, wireType] = reader.tag();
                switch (fieldNo) {
                    case /* bool correct */ 1:
                        message.correct = reader.bool();
                        break;
                    default:
                        let u = options.readUnknownField;
                        if (u === "throw")
                            throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                        let d = reader.skip(wireType);
                        if (u !== false)
                            (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
                }
            }
            return message;
        }
        internalBinaryWrite(message, writer, options) {
            /* bool correct = 1; */
            if (message.correct !== false)
                writer.tag(1, WireType.Varint).bool(message.correct);
            let u = options.writeUnknownFields;
            if (u !== false)
                (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
            return writer;
        }
    }
    /**
     * @generated MessageType for protobuf message ctfg.SubmitFlagResponse
     */
    const SubmitFlagResponse = new SubmitFlagResponse$Type();
    /**
     * @generated ServiceType for protobuf service ctfg.Backend
     */
    new ServiceType("ctfg.Backend", [
        { name: "Register", options: {}, I: RegisterRequest, O: RegisterResponse },
        { name: "Login", options: {}, I: LoginRequest, O: LoginResponse },
        { name: "CurrentUser", options: {}, I: CurrentUserRequest, O: CurrentUserResponse },
        { name: "GetChallenges", options: {}, I: GetChallengesRequest, O: GetChallengesResponse },
        { name: "SubmitFlag", options: {}, I: SubmitFlagRequest, O: SubmitFlagResponse },
        { name: "GetDiscoveredEvidence", options: {}, I: GetDiscoveredEvidenceRequest, O: GetDiscoveredEvidenceResponse },
        { name: "SubmitEvidence", options: {}, I: SubmitEvidenceRequest, O: SubmitEvidenceResponse },
        { name: "SubmitEvidenceConnection", options: {}, I: SubmitEvidenceConnectionRequest, O: SubmitEvidenceConnectionResponse }
    ]);

    class BackendClientJSON {
        constructor(rpc) {
            this.rpc = rpc;
            this.Register.bind(this);
            this.Login.bind(this);
            this.CurrentUser.bind(this);
            this.GetChallenges.bind(this);
            this.SubmitFlag.bind(this);
            this.GetDiscoveredEvidence.bind(this);
            this.SubmitEvidence.bind(this);
            this.SubmitEvidenceConnection.bind(this);
        }
        Register(request) {
            const data = RegisterRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "Register", "application/json", data);
            return promise.then((data) => RegisterResponse.fromJson(data, { ignoreUnknownFields: true }));
        }
        Login(request) {
            const data = LoginRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "Login", "application/json", data);
            return promise.then((data) => LoginResponse.fromJson(data, { ignoreUnknownFields: true }));
        }
        CurrentUser(request) {
            const data = CurrentUserRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "CurrentUser", "application/json", data);
            return promise.then((data) => CurrentUserResponse.fromJson(data, { ignoreUnknownFields: true }));
        }
        GetChallenges(request) {
            const data = GetChallengesRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "GetChallenges", "application/json", data);
            return promise.then((data) => GetChallengesResponse.fromJson(data, { ignoreUnknownFields: true }));
        }
        SubmitFlag(request) {
            const data = SubmitFlagRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "SubmitFlag", "application/json", data);
            return promise.then((data) => SubmitFlagResponse.fromJson(data, { ignoreUnknownFields: true }));
        }
        GetDiscoveredEvidence(request) {
            const data = GetDiscoveredEvidenceRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "GetDiscoveredEvidence", "application/json", data);
            return promise.then((data) => GetDiscoveredEvidenceResponse.fromJson(data, {
                ignoreUnknownFields: true,
            }));
        }
        SubmitEvidence(request) {
            const data = SubmitEvidenceRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "SubmitEvidence", "application/json", data);
            return promise.then((data) => SubmitEvidenceResponse.fromJson(data, {
                ignoreUnknownFields: true,
            }));
        }
        SubmitEvidenceConnection(request) {
            const data = SubmitEvidenceConnectionRequest.toJson(request, {
                useProtoFieldName: true,
                emitDefaultValues: false,
            });
            const promise = this.rpc.request("ctfg.Backend", "SubmitEvidenceConnection", "application/json", data);
            return promise.then((data) => SubmitEvidenceConnectionResponse.fromJson(data, {
                ignoreUnknownFields: true,
            }));
        }
    }
    var BackendMethod;
    (function (BackendMethod) {
        BackendMethod["Register"] = "Register";
        BackendMethod["Login"] = "Login";
        BackendMethod["CurrentUser"] = "CurrentUser";
        BackendMethod["GetChallenges"] = "GetChallenges";
        BackendMethod["SubmitFlag"] = "SubmitFlag";
        BackendMethod["GetDiscoveredEvidence"] = "GetDiscoveredEvidence";
        BackendMethod["SubmitEvidence"] = "SubmitEvidence";
        BackendMethod["SubmitEvidenceConnection"] = "SubmitEvidenceConnection";
    })(BackendMethod || (BackendMethod = {}));
    [
        BackendMethod.Register,
        BackendMethod.Login,
        BackendMethod.CurrentUser,
        BackendMethod.GetChallenges,
        BackendMethod.SubmitFlag,
        BackendMethod.GetDiscoveredEvidence,
        BackendMethod.SubmitEvidence,
        BackendMethod.SubmitEvidenceConnection,
    ];

    const ctfg = new BackendClientJSON(FetchRPC({
        baseUrl: "/twirp",
    }));

    const user = writable(null);
    const authSuccess = writable(null);
    const authError = writable(null);
    const login = async (email, password) => {
        try {
            const resp = await ctfg.Login({
                email,
                password,
            });
            user.set({
                username: "test",
            });
            authSuccess.set("Login success!");
        }
        catch (e) {
            authError.set(e);
        }
    };
    const register = async (username, email, password) => {
        try {
            const resp = await ctfg.Register({
                username,
                email,
                password,
            });
            authSuccess.set("Registration success! Go to login.");
        }
        catch (e) {
            authError.set(e);
        }
    };

    /* src/components/Navbar.svelte generated by Svelte v3.55.1 */
    const file$i = "src/components/Navbar.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (14:16) <Link                     on:click={() => updatePath(l.to)}                     to={l.to}                 >
    function create_default_slot$2(ctx) {
    	let span;
    	let t_value = /*l*/ ctx[5].label + "";
    	let t;

    	const block = {
    		c: function create() {
    			span = element("span");
    			t = text(t_value);
    			add_location(span, file$i, 17, 20, 528);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    			append_dev(span, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links*/ 1 && t_value !== (t_value = /*l*/ ctx[5].label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(14:16) <Link                     on:click={() => updatePath(l.to)}                     to={l.to}                 >",
    		ctx
    	});

    	return block;
    }

    // (12:8) {#each links as l}
    function create_each_block$5(ctx) {
    	let div;
    	let link;
    	let t;
    	let current;

    	function click_handler() {
    		return /*click_handler*/ ctx[3](/*l*/ ctx[5]);
    	}

    	link = new Link({
    			props: {
    				to: /*l*/ ctx[5].to,
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	link.$on("click", click_handler);

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(link.$$.fragment);
    			t = space();
    			attr_dev(div, "class", "link svelte-a4hsow");
    			add_location(div, file$i, 12, 12, 365);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(link, div, null);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const link_changes = {};
    			if (dirty & /*links*/ 1) link_changes.to = /*l*/ ctx[5].to;

    			if (dirty & /*$$scope, links*/ 257) {
    				link_changes.$$scope = { dirty, ctx };
    			}

    			link.$set(link_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(link.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(link.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(12:8) {#each links as l}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$m(ctx) {
    	let div3;
    	let div0;
    	let t1;
    	let div1;
    	let t2_value = /*$user*/ ctx[1]?.username + "";
    	let t2;
    	let t3;
    	let div2;
    	let current;
    	let each_value = /*links*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div0 = element("div");
    			div0.textContent = "CTFg";
    			t1 = space();
    			div1 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", "logo svelte-a4hsow");
    			add_location(div0, file$i, 8, 4, 241);
    			add_location(div1, file$i, 9, 4, 274);
    			attr_dev(div2, "class", "menu svelte-a4hsow");
    			add_location(div2, file$i, 10, 4, 307);
    			attr_dev(div3, "class", "navbar svelte-a4hsow");
    			add_location(div3, file$i, 7, 0, 216);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);
    			append_dev(div3, t1);
    			append_dev(div3, div1);
    			append_dev(div1, t2);
    			append_dev(div3, t3);
    			append_dev(div3, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$user*/ 2) && t2_value !== (t2_value = /*$user*/ ctx[1]?.username + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*links, updatePath*/ 5) {
    				each_value = /*links*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let $user;
    	validate_store(user, 'user');
    	component_subscribe($$self, user, $$value => $$invalidate(1, $user = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Navbar', slots, []);
    	let { links = [] } = $$props;
    	let path = window.location.pathname;
    	const updatePath = newPath => path = newPath;
    	const writable_props = ['links'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Navbar> was created with unknown prop '${key}'`);
    	});

    	const click_handler = l => updatePath(l.to);

    	$$self.$$set = $$props => {
    		if ('links' in $$props) $$invalidate(0, links = $$props.links);
    	};

    	$$self.$capture_state = () => ({
    		Link,
    		user,
    		links,
    		path,
    		updatePath,
    		$user
    	});

    	$$self.$inject_state = $$props => {
    		if ('links' in $$props) $$invalidate(0, links = $$props.links);
    		if ('path' in $$props) path = $$props.path;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [links, $user, updatePath, click_handler];
    }

    class Navbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, { links: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Navbar",
    			options,
    			id: create_fragment$m.name
    		});
    	}

    	get links() {
    		throw new Error("<Navbar>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set links(value) {
    		throw new Error("<Navbar>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/AuthFlowInfo.svelte generated by Svelte v3.55.1 */
    const file$h = "src/routes/AuthFlowInfo.svelte";

    // (12:2) {#if $authError}
    function create_if_block_1$4(ctx) {
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(/*$authError*/ ctx[0]);
    			add_location(p, file$h, 12, 4, 224);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$authError*/ 1) set_data_dev(t, /*$authError*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$4.name,
    		type: "if",
    		source: "(12:2) {#if $authError}",
    		ctx
    	});

    	return block;
    }

    // (15:2) {#if $authSuccess}
    function create_if_block$7(ctx) {
    	let p;
    	let t;

    	const block = {
    		c: function create() {
    			p = element("p");
    			t = text(/*$authSuccess*/ ctx[1]);
    			add_location(p, file$h, 15, 4, 277);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, p, anchor);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$authSuccess*/ 2) set_data_dev(t, /*$authSuccess*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(p);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(15:2) {#if $authSuccess}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let div;
    	let t;
    	let if_block0 = /*$authError*/ ctx[0] && create_if_block_1$4(ctx);
    	let if_block1 = /*$authSuccess*/ ctx[1] && create_if_block$7(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			add_location(div, file$h, 10, 0, 195);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t);
    			if (if_block1) if_block1.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$authError*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_1$4(ctx);
    					if_block0.c();
    					if_block0.m(div, t);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (/*$authSuccess*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block$7(ctx);
    					if_block1.c();
    					if_block1.m(div, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let $authError;
    	let $authSuccess;
    	validate_store(authError, 'authError');
    	component_subscribe($$self, authError, $$value => $$invalidate(0, $authError = $$value));
    	validate_store(authSuccess, 'authSuccess');
    	component_subscribe($$self, authSuccess, $$value => $$invalidate(1, $authSuccess = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AuthFlowInfo', slots, []);

    	onDestroy(() => {
    		authError.set(null);
    		authSuccess.set(null);
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AuthFlowInfo> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		authError,
    		authSuccess,
    		onDestroy,
    		$authError,
    		$authSuccess
    	});

    	return [$authError, $authSuccess];
    }

    class AuthFlowInfo extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AuthFlowInfo",
    			options,
    			id: create_fragment$l.name
    		});
    	}
    }

    /* src/routes/Login.svelte generated by Svelte v3.55.1 */
    const file$g = "src/routes/Login.svelte";

    function create_fragment$k(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let label1;
    	let t6;
    	let input1;
    	let t7;
    	let button;
    	let t9;
    	let authflowinfo;
    	let current;
    	let mounted;
    	let dispose;
    	authflowinfo = new AuthFlowInfo({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Log in";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Email";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Password";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			button = element("button");
    			button.textContent = "Log in";
    			t9 = space();
    			create_component(authflowinfo.$$.fragment);
    			add_location(h1, file$g, 24, 2, 573);
    			attr_dev(label0, "for", "email");
    			add_location(label0, file$g, 26, 2, 592);
    			attr_dev(input0, "id", "email");
    			attr_dev(input0, "type", "email");
    			add_location(input0, file$g, 27, 2, 627);
    			attr_dev(label1, "for", "password");
    			add_location(label1, file$g, 29, 2, 683);
    			attr_dev(input1, "id", "password");
    			attr_dev(input1, "type", "password");
    			add_location(input1, file$g, 30, 2, 724);
    			add_location(button, file$g, 32, 2, 789);
    			add_location(div, file$g, 23, 0, 565);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, label0);
    			append_dev(div, t3);
    			append_dev(div, input0);
    			set_input_value(input0, /*email*/ ctx[0]);
    			append_dev(div, t4);
    			append_dev(div, label1);
    			append_dev(div, t6);
    			append_dev(div, input1);
    			set_input_value(input1, /*password*/ ctx[1]);
    			append_dev(div, t7);
    			append_dev(div, button);
    			append_dev(div, t9);
    			mount_component(authflowinfo, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[3]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[4]),
    					listen_dev(button, "click", /*doLogin*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*email*/ 1 && input0.value !== /*email*/ ctx[0]) {
    				set_input_value(input0, /*email*/ ctx[0]);
    			}

    			if (dirty & /*password*/ 2 && input1.value !== /*password*/ ctx[1]) {
    				set_input_value(input1, /*password*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(authflowinfo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(authflowinfo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(authflowinfo);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Login', slots, []);
    	const dispatch = createEventDispatcher();
    	let email = '';
    	let password = '';

    	async function doLogin() {
    		await login(email, password);
    	}

    	// focus the email input on mount
    	onMount(() => {
    		document.querySelector('input').focus();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		email = this.value;
    		$$invalidate(0, email);
    	}

    	function input1_input_handler() {
    		password = this.value;
    		$$invalidate(1, password);
    	}

    	$$self.$capture_state = () => ({
    		AuthFlowInfo,
    		onMount,
    		createEventDispatcher,
    		login,
    		authError,
    		authSuccess,
    		dispatch,
    		email,
    		password,
    		doLogin
    	});

    	$$self.$inject_state = $$props => {
    		if ('email' in $$props) $$invalidate(0, email = $$props.email);
    		if ('password' in $$props) $$invalidate(1, password = $$props.password);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [email, password, doLogin, input0_input_handler, input1_input_handler];
    }

    class Login extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$k, create_fragment$k, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login",
    			options,
    			id: create_fragment$k.name
    		});
    	}
    }

    /* src/routes/Register.svelte generated by Svelte v3.55.1 */
    const file$f = "src/routes/Register.svelte";

    function create_fragment$j(ctx) {
    	let div;
    	let h1;
    	let t1;
    	let label0;
    	let t3;
    	let input0;
    	let t4;
    	let label1;
    	let t6;
    	let input1;
    	let t7;
    	let label2;
    	let t9;
    	let input2;
    	let t10;
    	let button;
    	let t12;
    	let authflowinfo;
    	let current;
    	let mounted;
    	let dispose;
    	authflowinfo = new AuthFlowInfo({ $$inline: true });

    	const block = {
    		c: function create() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Register";
    			t1 = space();
    			label0 = element("label");
    			label0.textContent = "Username";
    			t3 = space();
    			input0 = element("input");
    			t4 = space();
    			label1 = element("label");
    			label1.textContent = "Email";
    			t6 = space();
    			input1 = element("input");
    			t7 = space();
    			label2 = element("label");
    			label2.textContent = "Password";
    			t9 = space();
    			input2 = element("input");
    			t10 = space();
    			button = element("button");
    			button.textContent = "Register";
    			t12 = space();
    			create_component(authflowinfo.$$.fragment);
    			add_location(h1, file$f, 24, 4, 640);
    			attr_dev(label0, "for", "username");
    			add_location(label0, file$f, 26, 4, 663);
    			attr_dev(input0, "id", "username");
    			attr_dev(input0, "type", "username");
    			add_location(input0, file$f, 27, 4, 706);
    			attr_dev(label1, "for", "email");
    			add_location(label1, file$f, 29, 4, 773);
    			attr_dev(input1, "id", "email");
    			attr_dev(input1, "type", "email");
    			add_location(input1, file$f, 30, 4, 810);
    			attr_dev(label2, "for", "password");
    			add_location(label2, file$f, 32, 4, 868);
    			attr_dev(input2, "id", "password");
    			attr_dev(input2, "type", "password");
    			add_location(input2, file$f, 33, 4, 911);
    			add_location(button, file$f, 35, 4, 978);
    			add_location(div, file$f, 23, 0, 630);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h1);
    			append_dev(div, t1);
    			append_dev(div, label0);
    			append_dev(div, t3);
    			append_dev(div, input0);
    			set_input_value(input0, /*username*/ ctx[0]);
    			append_dev(div, t4);
    			append_dev(div, label1);
    			append_dev(div, t6);
    			append_dev(div, input1);
    			set_input_value(input1, /*email*/ ctx[1]);
    			append_dev(div, t7);
    			append_dev(div, label2);
    			append_dev(div, t9);
    			append_dev(div, input2);
    			set_input_value(input2, /*password*/ ctx[2]);
    			append_dev(div, t10);
    			append_dev(div, button);
    			append_dev(div, t12);
    			mount_component(authflowinfo, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[4]),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[5]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[6]),
    					listen_dev(button, "click", /*registerUser*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*username*/ 1) {
    				set_input_value(input0, /*username*/ ctx[0]);
    			}

    			if (dirty & /*email*/ 2 && input1.value !== /*email*/ ctx[1]) {
    				set_input_value(input1, /*email*/ ctx[1]);
    			}

    			if (dirty & /*password*/ 4 && input2.value !== /*password*/ ctx[2]) {
    				set_input_value(input2, /*password*/ ctx[2]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(authflowinfo.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(authflowinfo.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(authflowinfo);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Register', slots, []);
    	const dispatch = createEventDispatcher();
    	let username = '';
    	let email = '';
    	let password = '';

    	async function registerUser() {
    		await register(username, email, password);
    	}

    	// focus the email input on mount
    	onMount(() => {
    		document.querySelector('input').focus();
    	});

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Register> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		username = this.value;
    		$$invalidate(0, username);
    	}

    	function input1_input_handler() {
    		email = this.value;
    		$$invalidate(1, email);
    	}

    	function input2_input_handler() {
    		password = this.value;
    		$$invalidate(2, password);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		createEventDispatcher,
    		register,
    		AuthFlowInfo,
    		dispatch,
    		username,
    		email,
    		password,
    		registerUser
    	});

    	$$self.$inject_state = $$props => {
    		if ('username' in $$props) $$invalidate(0, username = $$props.username);
    		if ('email' in $$props) $$invalidate(1, email = $$props.email);
    		if ('password' in $$props) $$invalidate(2, password = $$props.password);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		username,
    		email,
    		password,
    		registerUser,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler
    	];
    }

    class Register extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$j, create_fragment$j, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Register",
    			options,
    			id: create_fragment$j.name
    		});
    	}
    }

    /* src/routes/Home.svelte generated by Svelte v3.55.1 */

    const file$e = "src/routes/Home.svelte";

    function create_fragment$i(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Welcome to CTFg!";
    			add_location(h1, file$e, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Home', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Home> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Home extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Home",
    			options,
    			id: create_fragment$i.name
    		});
    	}
    }

    var noop = {value: () => {}};

    function dispatch() {
      for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
      }
      return new Dispatch(_);
    }

    function Dispatch(_) {
      this._ = _;
    }

    function parseTypenames$1(typenames, types) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {type: t, name: name};
      });
    }

    Dispatch.prototype = dispatch.prototype = {
      constructor: Dispatch,
      on: function(typename, callback) {
        var _ = this._,
            T = parseTypenames$1(typename + "", _),
            t,
            i = -1,
            n = T.length;

        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
          while (++i < n) if ((t = (typename = T[i]).type) && (t = get$1(_[t], typename.name))) return t;
          return;
        }

        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while (++i < n) {
          if (t = (typename = T[i]).type) _[t] = set$1(_[t], typename.name, callback);
          else if (callback == null) for (t in _) _[t] = set$1(_[t], typename.name, null);
        }

        return this;
      },
      copy: function() {
        var copy = {}, _ = this._;
        for (var t in _) copy[t] = _[t].slice();
        return new Dispatch(copy);
      },
      call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      },
      apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
      }
    };

    function get$1(type, name) {
      for (var i = 0, n = type.length, c; i < n; ++i) {
        if ((c = type[i]).name === name) {
          return c.value;
        }
      }
    }

    function set$1(type, name, callback) {
      for (var i = 0, n = type.length; i < n; ++i) {
        if (type[i].name === name) {
          type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
          break;
        }
      }
      if (callback != null) type.push({name: name, value: callback});
      return type;
    }

    var xhtml = "http://www.w3.org/1999/xhtml";

    var namespaces = {
      svg: "http://www.w3.org/2000/svg",
      xhtml: xhtml,
      xlink: "http://www.w3.org/1999/xlink",
      xml: "http://www.w3.org/XML/1998/namespace",
      xmlns: "http://www.w3.org/2000/xmlns/"
    };

    function namespace(name) {
      var prefix = name += "", i = prefix.indexOf(":");
      if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
      return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
    }

    function creatorInherit(name) {
      return function() {
        var document = this.ownerDocument,
            uri = this.namespaceURI;
        return uri === xhtml && document.documentElement.namespaceURI === xhtml
            ? document.createElement(name)
            : document.createElementNS(uri, name);
      };
    }

    function creatorFixed(fullname) {
      return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
      };
    }

    function creator(name) {
      var fullname = namespace(name);
      return (fullname.local
          ? creatorFixed
          : creatorInherit)(fullname);
    }

    function none() {}

    function selector(selector) {
      return selector == null ? none : function() {
        return this.querySelector(selector);
      };
    }

    function selection_select(select) {
      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    // Given something array like (or null), returns something that is strictly an
    // array. This is used to ensure that array-like objects passed to d3.selectAll
    // or selection.selectAll are converted into proper arrays when creating a
    // selection; we don’t ever want to create a selection backed by a live
    // HTMLCollection or NodeList. However, note that selection.selectAll will use a
    // static NodeList as a group, since it safely derived from querySelectorAll.
    function array(x) {
      return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
    }

    function empty() {
      return [];
    }

    function selectorAll(selector) {
      return selector == null ? empty : function() {
        return this.querySelectorAll(selector);
      };
    }

    function arrayAll(select) {
      return function() {
        return array(select.apply(this, arguments));
      };
    }

    function selection_selectAll(select) {
      if (typeof select === "function") select = arrayAll(select);
      else select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            subgroups.push(select.call(node, node.__data__, i, group));
            parents.push(node);
          }
        }
      }

      return new Selection$1(subgroups, parents);
    }

    function matcher(selector) {
      return function() {
        return this.matches(selector);
      };
    }

    function childMatcher(selector) {
      return function(node) {
        return node.matches(selector);
      };
    }

    var find = Array.prototype.find;

    function childFind(match) {
      return function() {
        return find.call(this.children, match);
      };
    }

    function childFirst() {
      return this.firstElementChild;
    }

    function selection_selectChild(match) {
      return this.select(match == null ? childFirst
          : childFind(typeof match === "function" ? match : childMatcher(match)));
    }

    var filter = Array.prototype.filter;

    function children() {
      return Array.from(this.children);
    }

    function childrenFilter(match) {
      return function() {
        return filter.call(this.children, match);
      };
    }

    function selection_selectChildren(match) {
      return this.selectAll(match == null ? children
          : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
    }

    function selection_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Selection$1(subgroups, this._parents);
    }

    function sparse(update) {
      return new Array(update.length);
    }

    function selection_enter() {
      return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
    }

    function EnterNode(parent, datum) {
      this.ownerDocument = parent.ownerDocument;
      this.namespaceURI = parent.namespaceURI;
      this._next = null;
      this._parent = parent;
      this.__data__ = datum;
    }

    EnterNode.prototype = {
      constructor: EnterNode,
      appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
      insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
      querySelector: function(selector) { return this._parent.querySelector(selector); },
      querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
    };

    function constant$2(x) {
      return function() {
        return x;
      };
    }

    function bindIndex(parent, group, enter, update, exit, data) {
      var i = 0,
          node,
          groupLength = group.length,
          dataLength = data.length;

      // Put any non-null nodes that fit into update.
      // Put any null nodes into enter.
      // Put any remaining data into enter.
      for (; i < dataLength; ++i) {
        if (node = group[i]) {
          node.__data__ = data[i];
          update[i] = node;
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Put any non-null nodes that don’t fit into exit.
      for (; i < groupLength; ++i) {
        if (node = group[i]) {
          exit[i] = node;
        }
      }
    }

    function bindKey(parent, group, enter, update, exit, data, key) {
      var i,
          node,
          nodeByKeyValue = new Map,
          groupLength = group.length,
          dataLength = data.length,
          keyValues = new Array(groupLength),
          keyValue;

      // Compute the key for each node.
      // If multiple nodes have the same key, the duplicates are added to exit.
      for (i = 0; i < groupLength; ++i) {
        if (node = group[i]) {
          keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
          if (nodeByKeyValue.has(keyValue)) {
            exit[i] = node;
          } else {
            nodeByKeyValue.set(keyValue, node);
          }
        }
      }

      // Compute the key for each datum.
      // If there a node associated with this key, join and add it to update.
      // If there is not (or the key is a duplicate), add it to enter.
      for (i = 0; i < dataLength; ++i) {
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
          update[i] = node;
          node.__data__ = data[i];
          nodeByKeyValue.delete(keyValue);
        } else {
          enter[i] = new EnterNode(parent, data[i]);
        }
      }

      // Add any remaining nodes that were not bound to data to exit.
      for (i = 0; i < groupLength; ++i) {
        if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
          exit[i] = node;
        }
      }
    }

    function datum(node) {
      return node.__data__;
    }

    function selection_data(value, key) {
      if (!arguments.length) return Array.from(this, datum);

      var bind = key ? bindKey : bindIndex,
          parents = this._parents,
          groups = this._groups;

      if (typeof value !== "function") value = constant$2(value);

      for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
        var parent = parents[j],
            group = groups[j],
            groupLength = group.length,
            data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
            dataLength = data.length,
            enterGroup = enter[j] = new Array(dataLength),
            updateGroup = update[j] = new Array(dataLength),
            exitGroup = exit[j] = new Array(groupLength);

        bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

        // Now connect the enter nodes to their following update node, such that
        // appendChild can insert the materialized enter node before this node,
        // rather than at the end of the parent node.
        for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
          if (previous = enterGroup[i0]) {
            if (i0 >= i1) i1 = i0 + 1;
            while (!(next = updateGroup[i1]) && ++i1 < dataLength);
            previous._next = next || null;
          }
        }
      }

      update = new Selection$1(update, parents);
      update._enter = enter;
      update._exit = exit;
      return update;
    }

    // Given some data, this returns an array-like view of it: an object that
    // exposes a length property and allows numeric indexing. Note that unlike
    // selectAll, this isn’t worried about “live” collections because the resulting
    // array will only be used briefly while data is being bound. (It is possible to
    // cause the data to change while iterating by using a key function, but please
    // don’t; we’d rather avoid a gratuitous copy.)
    function arraylike(data) {
      return typeof data === "object" && "length" in data
        ? data // Array, TypedArray, NodeList, array-like
        : Array.from(data); // Map, Set, iterable, string, or anything else
    }

    function selection_exit() {
      return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
    }

    function selection_join(onenter, onupdate, onexit) {
      var enter = this.enter(), update = this, exit = this.exit();
      if (typeof onenter === "function") {
        enter = onenter(enter);
        if (enter) enter = enter.selection();
      } else {
        enter = enter.append(onenter + "");
      }
      if (onupdate != null) {
        update = onupdate(update);
        if (update) update = update.selection();
      }
      if (onexit == null) exit.remove(); else onexit(exit);
      return enter && update ? enter.merge(update).order() : update;
    }

    function selection_merge(context) {
      var selection = context.selection ? context.selection() : context;

      for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Selection$1(merges, this._parents);
    }

    function selection_order() {

      for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
        for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
          if (node = group[i]) {
            if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
            next = node;
          }
        }
      }

      return this;
    }

    function selection_sort(compare) {
      if (!compare) compare = ascending;

      function compareNode(a, b) {
        return a && b ? compare(a.__data__, b.__data__) : !a - !b;
      }

      for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            sortgroup[i] = node;
          }
        }
        sortgroup.sort(compareNode);
      }

      return new Selection$1(sortgroups, this._parents).order();
    }

    function ascending(a, b) {
      return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    }

    function selection_call() {
      var callback = arguments[0];
      arguments[0] = this;
      callback.apply(null, arguments);
      return this;
    }

    function selection_nodes() {
      return Array.from(this);
    }

    function selection_node() {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
          var node = group[i];
          if (node) return node;
        }
      }

      return null;
    }

    function selection_size() {
      let size = 0;
      for (const node of this) ++size; // eslint-disable-line no-unused-vars
      return size;
    }

    function selection_empty() {
      return !this.node();
    }

    function selection_each(callback) {

      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
      }

      return this;
    }

    function attrRemove$1(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS$1(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant$1(name, value) {
      return function() {
        this.setAttribute(name, value);
      };
    }

    function attrConstantNS$1(fullname, value) {
      return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
      };
    }

    function attrFunction$1(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
      };
    }

    function attrFunctionNS$1(fullname, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
      };
    }

    function selection_attr(name, value) {
      var fullname = namespace(name);

      if (arguments.length < 2) {
        var node = this.node();
        return fullname.local
            ? node.getAttributeNS(fullname.space, fullname.local)
            : node.getAttribute(fullname);
      }

      return this.each((value == null
          ? (fullname.local ? attrRemoveNS$1 : attrRemove$1) : (typeof value === "function"
          ? (fullname.local ? attrFunctionNS$1 : attrFunction$1)
          : (fullname.local ? attrConstantNS$1 : attrConstant$1)))(fullname, value));
    }

    function defaultView(node) {
      return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
          || (node.document && node) // node is a Window
          || node.defaultView; // node is a Document
    }

    function styleRemove$1(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant$1(name, value, priority) {
      return function() {
        this.style.setProperty(name, value, priority);
      };
    }

    function styleFunction$1(name, value, priority) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
      };
    }

    function selection_style(name, value, priority) {
      return arguments.length > 1
          ? this.each((value == null
                ? styleRemove$1 : typeof value === "function"
                ? styleFunction$1
                : styleConstant$1)(name, value, priority == null ? "" : priority))
          : styleValue(this.node(), name);
    }

    function styleValue(node, name) {
      return node.style.getPropertyValue(name)
          || defaultView(node).getComputedStyle(node, null).getPropertyValue(name);
    }

    function propertyRemove(name) {
      return function() {
        delete this[name];
      };
    }

    function propertyConstant(name, value) {
      return function() {
        this[name] = value;
      };
    }

    function propertyFunction(name, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
      };
    }

    function selection_property(name, value) {
      return arguments.length > 1
          ? this.each((value == null
              ? propertyRemove : typeof value === "function"
              ? propertyFunction
              : propertyConstant)(name, value))
          : this.node()[name];
    }

    function classArray(string) {
      return string.trim().split(/^|\s+/);
    }

    function classList(node) {
      return node.classList || new ClassList(node);
    }

    function ClassList(node) {
      this._node = node;
      this._names = classArray(node.getAttribute("class") || "");
    }

    ClassList.prototype = {
      add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
          this._names.push(name);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
          this._names.splice(i, 1);
          this._node.setAttribute("class", this._names.join(" "));
        }
      },
      contains: function(name) {
        return this._names.indexOf(name) >= 0;
      }
    };

    function classedAdd(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.add(names[i]);
    }

    function classedRemove(node, names) {
      var list = classList(node), i = -1, n = names.length;
      while (++i < n) list.remove(names[i]);
    }

    function classedTrue(names) {
      return function() {
        classedAdd(this, names);
      };
    }

    function classedFalse(names) {
      return function() {
        classedRemove(this, names);
      };
    }

    function classedFunction(names, value) {
      return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
      };
    }

    function selection_classed(name, value) {
      var names = classArray(name + "");

      if (arguments.length < 2) {
        var list = classList(this.node()), i = -1, n = names.length;
        while (++i < n) if (!list.contains(names[i])) return false;
        return true;
      }

      return this.each((typeof value === "function"
          ? classedFunction : value
          ? classedTrue
          : classedFalse)(names, value));
    }

    function textRemove() {
      this.textContent = "";
    }

    function textConstant$1(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction$1(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
      };
    }

    function selection_text(value) {
      return arguments.length
          ? this.each(value == null
              ? textRemove : (typeof value === "function"
              ? textFunction$1
              : textConstant$1)(value))
          : this.node().textContent;
    }

    function htmlRemove() {
      this.innerHTML = "";
    }

    function htmlConstant(value) {
      return function() {
        this.innerHTML = value;
      };
    }

    function htmlFunction(value) {
      return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
      };
    }

    function selection_html(value) {
      return arguments.length
          ? this.each(value == null
              ? htmlRemove : (typeof value === "function"
              ? htmlFunction
              : htmlConstant)(value))
          : this.node().innerHTML;
    }

    function raise() {
      if (this.nextSibling) this.parentNode.appendChild(this);
    }

    function selection_raise() {
      return this.each(raise);
    }

    function lower() {
      if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
    }

    function selection_lower() {
      return this.each(lower);
    }

    function selection_append(name) {
      var create = typeof name === "function" ? name : creator(name);
      return this.select(function() {
        return this.appendChild(create.apply(this, arguments));
      });
    }

    function constantNull() {
      return null;
    }

    function selection_insert(name, before) {
      var create = typeof name === "function" ? name : creator(name),
          select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
      return this.select(function() {
        return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
      });
    }

    function remove() {
      var parent = this.parentNode;
      if (parent) parent.removeChild(this);
    }

    function selection_remove() {
      return this.each(remove);
    }

    function selection_cloneShallow() {
      var clone = this.cloneNode(false), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_cloneDeep() {
      var clone = this.cloneNode(true), parent = this.parentNode;
      return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
    }

    function selection_clone(deep) {
      return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    }

    function selection_datum(value) {
      return arguments.length
          ? this.property("__data__", value)
          : this.node().__data__;
    }

    function contextListener(listener) {
      return function(event) {
        listener.call(this, event, this.__data__);
      };
    }

    function parseTypenames(typenames) {
      return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {type: t, name: name};
      });
    }

    function onRemove(typename) {
      return function() {
        var on = this.__on;
        if (!on) return;
        for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
          if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
          } else {
            on[++i] = o;
          }
        }
        if (++i) on.length = i;
        else delete this.__on;
      };
    }

    function onAdd(typename, value, options) {
      return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) for (var j = 0, m = on.length; j < m; ++j) {
          if ((o = on[j]).type === typename.type && o.name === typename.name) {
            this.removeEventListener(o.type, o.listener, o.options);
            this.addEventListener(o.type, o.listener = listener, o.options = options);
            o.value = value;
            return;
          }
        }
        this.addEventListener(typename.type, listener, options);
        o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
        if (!on) this.__on = [o];
        else on.push(o);
      };
    }

    function selection_on(typename, value, options) {
      var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

      if (arguments.length < 2) {
        var on = this.node().__on;
        if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
          for (i = 0, o = on[j]; i < n; ++i) {
            if ((t = typenames[i]).type === o.type && t.name === o.name) {
              return o.value;
            }
          }
        }
        return;
      }

      on = value ? onAdd : onRemove;
      for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
      return this;
    }

    function dispatchEvent(node, type, params) {
      var window = defaultView(node),
          event = window.CustomEvent;

      if (typeof event === "function") {
        event = new event(type, params);
      } else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
      }

      node.dispatchEvent(event);
    }

    function dispatchConstant(type, params) {
      return function() {
        return dispatchEvent(this, type, params);
      };
    }

    function dispatchFunction(type, params) {
      return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
      };
    }

    function selection_dispatch(type, params) {
      return this.each((typeof params === "function"
          ? dispatchFunction
          : dispatchConstant)(type, params));
    }

    function* selection_iterator() {
      for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
        for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
          if (node = group[i]) yield node;
        }
      }
    }

    var root = [null];

    function Selection$1(groups, parents) {
      this._groups = groups;
      this._parents = parents;
    }

    function selection() {
      return new Selection$1([[document.documentElement]], root);
    }

    function selection_selection() {
      return this;
    }

    Selection$1.prototype = selection.prototype = {
      constructor: Selection$1,
      select: selection_select,
      selectAll: selection_selectAll,
      selectChild: selection_selectChild,
      selectChildren: selection_selectChildren,
      filter: selection_filter,
      data: selection_data,
      enter: selection_enter,
      exit: selection_exit,
      join: selection_join,
      merge: selection_merge,
      selection: selection_selection,
      order: selection_order,
      sort: selection_sort,
      call: selection_call,
      nodes: selection_nodes,
      node: selection_node,
      size: selection_size,
      empty: selection_empty,
      each: selection_each,
      attr: selection_attr,
      style: selection_style,
      property: selection_property,
      classed: selection_classed,
      text: selection_text,
      html: selection_html,
      raise: selection_raise,
      lower: selection_lower,
      append: selection_append,
      insert: selection_insert,
      remove: selection_remove,
      clone: selection_clone,
      datum: selection_datum,
      on: selection_on,
      dispatch: selection_dispatch,
      [Symbol.iterator]: selection_iterator
    };

    function select(selector) {
      return typeof selector === "string"
          ? new Selection$1([[document.querySelector(selector)]], [document.documentElement])
          : new Selection$1([[selector]], root);
    }

    var nextId = 0;

    function local() {
      return new Local;
    }

    function Local() {
      this._ = "@" + (++nextId).toString(36);
    }

    Local.prototype = local.prototype = {
      constructor: Local,
      get: function(node) {
        var id = this._;
        while (!(id in node)) if (!(node = node.parentNode)) return;
        return node[id];
      },
      set: function(node, value) {
        return node[this._] = value;
      },
      remove: function(node) {
        return this._ in node && delete node[this._];
      },
      toString: function() {
        return this._;
      }
    };

    function sourceEvent(event) {
      let sourceEvent;
      while (sourceEvent = event.sourceEvent) event = sourceEvent;
      return event;
    }

    function pointer(event, node) {
      event = sourceEvent(event);
      if (node === undefined) node = event.currentTarget;
      if (node) {
        var svg = node.ownerSVGElement || node;
        if (svg.createSVGPoint) {
          var point = svg.createSVGPoint();
          point.x = event.clientX, point.y = event.clientY;
          point = point.matrixTransform(node.getScreenCTM().inverse());
          return [point.x, point.y];
        }
        if (node.getBoundingClientRect) {
          var rect = node.getBoundingClientRect();
          return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
        }
      }
      return [event.pageX, event.pageY];
    }

    function selectAll(selector) {
      return typeof selector === "string"
          ? new Selection$1([document.querySelectorAll(selector)], [document.documentElement])
          : new Selection$1([array(selector)], root);
    }

    // These are typically used in conjunction with noevent to ensure that we can
    const nonpassivecapture = {capture: true, passive: false};

    function noevent$1(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    function dragDisable(view) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", noevent$1, nonpassivecapture);
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", noevent$1, nonpassivecapture);
      } else {
        root.__noselect = root.style.MozUserSelect;
        root.style.MozUserSelect = "none";
      }
    }

    function yesdrag(view, noclick) {
      var root = view.document.documentElement,
          selection = select(view).on("dragstart.drag", null);
      if (noclick) {
        selection.on("click.drag", noevent$1, nonpassivecapture);
        setTimeout(function() { selection.on("click.drag", null); }, 0);
      }
      if ("onselectstart" in root) {
        selection.on("selectstart.drag", null);
      } else {
        root.style.MozUserSelect = root.__noselect;
        delete root.__noselect;
      }
    }

    function define(constructor, factory, prototype) {
      constructor.prototype = factory.prototype = prototype;
      prototype.constructor = constructor;
    }

    function extend(parent, definition) {
      var prototype = Object.create(parent.prototype);
      for (var key in definition) prototype[key] = definition[key];
      return prototype;
    }

    function Color() {}

    var darker = 0.7;
    var brighter = 1 / darker;

    var reI = "\\s*([+-]?\\d+)\\s*",
        reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
        reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
        reHex = /^#([0-9a-f]{3,8})$/,
        reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
        reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
        reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
        reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
        reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
        reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

    var named = {
      aliceblue: 0xf0f8ff,
      antiquewhite: 0xfaebd7,
      aqua: 0x00ffff,
      aquamarine: 0x7fffd4,
      azure: 0xf0ffff,
      beige: 0xf5f5dc,
      bisque: 0xffe4c4,
      black: 0x000000,
      blanchedalmond: 0xffebcd,
      blue: 0x0000ff,
      blueviolet: 0x8a2be2,
      brown: 0xa52a2a,
      burlywood: 0xdeb887,
      cadetblue: 0x5f9ea0,
      chartreuse: 0x7fff00,
      chocolate: 0xd2691e,
      coral: 0xff7f50,
      cornflowerblue: 0x6495ed,
      cornsilk: 0xfff8dc,
      crimson: 0xdc143c,
      cyan: 0x00ffff,
      darkblue: 0x00008b,
      darkcyan: 0x008b8b,
      darkgoldenrod: 0xb8860b,
      darkgray: 0xa9a9a9,
      darkgreen: 0x006400,
      darkgrey: 0xa9a9a9,
      darkkhaki: 0xbdb76b,
      darkmagenta: 0x8b008b,
      darkolivegreen: 0x556b2f,
      darkorange: 0xff8c00,
      darkorchid: 0x9932cc,
      darkred: 0x8b0000,
      darksalmon: 0xe9967a,
      darkseagreen: 0x8fbc8f,
      darkslateblue: 0x483d8b,
      darkslategray: 0x2f4f4f,
      darkslategrey: 0x2f4f4f,
      darkturquoise: 0x00ced1,
      darkviolet: 0x9400d3,
      deeppink: 0xff1493,
      deepskyblue: 0x00bfff,
      dimgray: 0x696969,
      dimgrey: 0x696969,
      dodgerblue: 0x1e90ff,
      firebrick: 0xb22222,
      floralwhite: 0xfffaf0,
      forestgreen: 0x228b22,
      fuchsia: 0xff00ff,
      gainsboro: 0xdcdcdc,
      ghostwhite: 0xf8f8ff,
      gold: 0xffd700,
      goldenrod: 0xdaa520,
      gray: 0x808080,
      green: 0x008000,
      greenyellow: 0xadff2f,
      grey: 0x808080,
      honeydew: 0xf0fff0,
      hotpink: 0xff69b4,
      indianred: 0xcd5c5c,
      indigo: 0x4b0082,
      ivory: 0xfffff0,
      khaki: 0xf0e68c,
      lavender: 0xe6e6fa,
      lavenderblush: 0xfff0f5,
      lawngreen: 0x7cfc00,
      lemonchiffon: 0xfffacd,
      lightblue: 0xadd8e6,
      lightcoral: 0xf08080,
      lightcyan: 0xe0ffff,
      lightgoldenrodyellow: 0xfafad2,
      lightgray: 0xd3d3d3,
      lightgreen: 0x90ee90,
      lightgrey: 0xd3d3d3,
      lightpink: 0xffb6c1,
      lightsalmon: 0xffa07a,
      lightseagreen: 0x20b2aa,
      lightskyblue: 0x87cefa,
      lightslategray: 0x778899,
      lightslategrey: 0x778899,
      lightsteelblue: 0xb0c4de,
      lightyellow: 0xffffe0,
      lime: 0x00ff00,
      limegreen: 0x32cd32,
      linen: 0xfaf0e6,
      magenta: 0xff00ff,
      maroon: 0x800000,
      mediumaquamarine: 0x66cdaa,
      mediumblue: 0x0000cd,
      mediumorchid: 0xba55d3,
      mediumpurple: 0x9370db,
      mediumseagreen: 0x3cb371,
      mediumslateblue: 0x7b68ee,
      mediumspringgreen: 0x00fa9a,
      mediumturquoise: 0x48d1cc,
      mediumvioletred: 0xc71585,
      midnightblue: 0x191970,
      mintcream: 0xf5fffa,
      mistyrose: 0xffe4e1,
      moccasin: 0xffe4b5,
      navajowhite: 0xffdead,
      navy: 0x000080,
      oldlace: 0xfdf5e6,
      olive: 0x808000,
      olivedrab: 0x6b8e23,
      orange: 0xffa500,
      orangered: 0xff4500,
      orchid: 0xda70d6,
      palegoldenrod: 0xeee8aa,
      palegreen: 0x98fb98,
      paleturquoise: 0xafeeee,
      palevioletred: 0xdb7093,
      papayawhip: 0xffefd5,
      peachpuff: 0xffdab9,
      peru: 0xcd853f,
      pink: 0xffc0cb,
      plum: 0xdda0dd,
      powderblue: 0xb0e0e6,
      purple: 0x800080,
      rebeccapurple: 0x663399,
      red: 0xff0000,
      rosybrown: 0xbc8f8f,
      royalblue: 0x4169e1,
      saddlebrown: 0x8b4513,
      salmon: 0xfa8072,
      sandybrown: 0xf4a460,
      seagreen: 0x2e8b57,
      seashell: 0xfff5ee,
      sienna: 0xa0522d,
      silver: 0xc0c0c0,
      skyblue: 0x87ceeb,
      slateblue: 0x6a5acd,
      slategray: 0x708090,
      slategrey: 0x708090,
      snow: 0xfffafa,
      springgreen: 0x00ff7f,
      steelblue: 0x4682b4,
      tan: 0xd2b48c,
      teal: 0x008080,
      thistle: 0xd8bfd8,
      tomato: 0xff6347,
      turquoise: 0x40e0d0,
      violet: 0xee82ee,
      wheat: 0xf5deb3,
      white: 0xffffff,
      whitesmoke: 0xf5f5f5,
      yellow: 0xffff00,
      yellowgreen: 0x9acd32
    };

    define(Color, color, {
      copy(channels) {
        return Object.assign(new this.constructor, this, channels);
      },
      displayable() {
        return this.rgb().displayable();
      },
      hex: color_formatHex, // Deprecated! Use color.formatHex.
      formatHex: color_formatHex,
      formatHex8: color_formatHex8,
      formatHsl: color_formatHsl,
      formatRgb: color_formatRgb,
      toString: color_formatRgb
    });

    function color_formatHex() {
      return this.rgb().formatHex();
    }

    function color_formatHex8() {
      return this.rgb().formatHex8();
    }

    function color_formatHsl() {
      return hslConvert(this).formatHsl();
    }

    function color_formatRgb() {
      return this.rgb().formatRgb();
    }

    function color(format) {
      var m, l;
      format = (format + "").trim().toLowerCase();
      return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
          : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
          : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
          : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
          : null) // invalid hex
          : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
          : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
          : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
          : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
          : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
          : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
          : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
          : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
          : null;
    }

    function rgbn(n) {
      return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
    }

    function rgba(r, g, b, a) {
      if (a <= 0) r = g = b = NaN;
      return new Rgb(r, g, b, a);
    }

    function rgbConvert(o) {
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Rgb;
      o = o.rgb();
      return new Rgb(o.r, o.g, o.b, o.opacity);
    }

    function rgb(r, g, b, opacity) {
      return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
    }

    function Rgb(r, g, b, opacity) {
      this.r = +r;
      this.g = +g;
      this.b = +b;
      this.opacity = +opacity;
    }

    define(Rgb, rgb, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
      },
      rgb() {
        return this;
      },
      clamp() {
        return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
      },
      displayable() {
        return (-0.5 <= this.r && this.r < 255.5)
            && (-0.5 <= this.g && this.g < 255.5)
            && (-0.5 <= this.b && this.b < 255.5)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      hex: rgb_formatHex, // Deprecated! Use color.formatHex.
      formatHex: rgb_formatHex,
      formatHex8: rgb_formatHex8,
      formatRgb: rgb_formatRgb,
      toString: rgb_formatRgb
    }));

    function rgb_formatHex() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
    }

    function rgb_formatHex8() {
      return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
    }

    function rgb_formatRgb() {
      const a = clampa(this.opacity);
      return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
    }

    function clampa(opacity) {
      return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
    }

    function clampi(value) {
      return Math.max(0, Math.min(255, Math.round(value) || 0));
    }

    function hex(value) {
      value = clampi(value);
      return (value < 16 ? "0" : "") + value.toString(16);
    }

    function hsla(h, s, l, a) {
      if (a <= 0) h = s = l = NaN;
      else if (l <= 0 || l >= 1) h = s = NaN;
      else if (s <= 0) h = NaN;
      return new Hsl(h, s, l, a);
    }

    function hslConvert(o) {
      if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
      if (!(o instanceof Color)) o = color(o);
      if (!o) return new Hsl;
      if (o instanceof Hsl) return o;
      o = o.rgb();
      var r = o.r / 255,
          g = o.g / 255,
          b = o.b / 255,
          min = Math.min(r, g, b),
          max = Math.max(r, g, b),
          h = NaN,
          s = max - min,
          l = (max + min) / 2;
      if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
      } else {
        s = l > 0 && l < 1 ? 0 : h;
      }
      return new Hsl(h, s, l, o.opacity);
    }

    function hsl(h, s, l, opacity) {
      return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
    }

    function Hsl(h, s, l, opacity) {
      this.h = +h;
      this.s = +s;
      this.l = +l;
      this.opacity = +opacity;
    }

    define(Hsl, hsl, extend(Color, {
      brighter(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      darker(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
      },
      rgb() {
        var h = this.h % 360 + (this.h < 0) * 360,
            s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
            l = this.l,
            m2 = l + (l < 0.5 ? l : 1 - l) * s,
            m1 = 2 * l - m2;
        return new Rgb(
          hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
          hsl2rgb(h, m1, m2),
          hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
          this.opacity
        );
      },
      clamp() {
        return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
      },
      displayable() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s))
            && (0 <= this.l && this.l <= 1)
            && (0 <= this.opacity && this.opacity <= 1);
      },
      formatHsl() {
        const a = clampa(this.opacity);
        return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
      }
    }));

    function clamph(value) {
      value = (value || 0) % 360;
      return value < 0 ? value + 360 : value;
    }

    function clampt(value) {
      return Math.max(0, Math.min(1, value || 0));
    }

    /* From FvD 13.37, CSS Color Module Level 3 */
    function hsl2rgb(h, m1, m2) {
      return (h < 60 ? m1 + (m2 - m1) * h / 60
          : h < 180 ? m2
          : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
          : m1) * 255;
    }

    var constant$1 = x => () => x;

    function linear(a, d) {
      return function(t) {
        return a + t * d;
      };
    }

    function exponential(a, b, y) {
      return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
      };
    }

    function gamma(y) {
      return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : constant$1(isNaN(a) ? b : a);
      };
    }

    function nogamma(a, b) {
      var d = b - a;
      return d ? linear(a, d) : constant$1(isNaN(a) ? b : a);
    }

    var interpolateRgb = (function rgbGamma(y) {
      var color = gamma(y);

      function rgb$1(start, end) {
        var r = color((start = rgb(start)).r, (end = rgb(end)).r),
            g = color(start.g, end.g),
            b = color(start.b, end.b),
            opacity = nogamma(start.opacity, end.opacity);
        return function(t) {
          start.r = r(t);
          start.g = g(t);
          start.b = b(t);
          start.opacity = opacity(t);
          return start + "";
        };
      }

      rgb$1.gamma = rgbGamma;

      return rgb$1;
    })(1);

    function interpolateNumber(a, b) {
      return a = +a, b = +b, function(t) {
        return a * (1 - t) + b * t;
      };
    }

    var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        reB = new RegExp(reA.source, "g");

    function zero(b) {
      return function() {
        return b;
      };
    }

    function one(b) {
      return function(t) {
        return b(t) + "";
      };
    }

    function interpolateString(a, b) {
      var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
          am, // current match in a
          bm, // current match in b
          bs, // string preceding current number in b, if any
          i = -1, // index in s
          s = [], // string constants and placeholders
          q = []; // number interpolators

      // Coerce inputs to strings.
      a = a + "", b = b + "";

      // Interpolate pairs of numbers in a & b.
      while ((am = reA.exec(a))
          && (bm = reB.exec(b))) {
        if ((bs = bm.index) > bi) { // a string precedes the next number in b
          bs = b.slice(bi, bs);
          if (s[i]) s[i] += bs; // coalesce with previous string
          else s[++i] = bs;
        }
        if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
          if (s[i]) s[i] += bm; // coalesce with previous string
          else s[++i] = bm;
        } else { // interpolate non-matching numbers
          s[++i] = null;
          q.push({i: i, x: interpolateNumber(am, bm)});
        }
        bi = reB.lastIndex;
      }

      // Add remains of b.
      if (bi < b.length) {
        bs = b.slice(bi);
        if (s[i]) s[i] += bs; // coalesce with previous string
        else s[++i] = bs;
      }

      // Special optimization for only a single match.
      // Otherwise, interpolate each of the numbers and rejoin the string.
      return s.length < 2 ? (q[0]
          ? one(q[0].x)
          : zero(b))
          : (b = q.length, function(t) {
              for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
              return s.join("");
            });
    }

    var degrees = 180 / Math.PI;

    var identity$1 = {
      translateX: 0,
      translateY: 0,
      rotate: 0,
      skewX: 0,
      scaleX: 1,
      scaleY: 1
    };

    function decompose(a, b, c, d, e, f) {
      var scaleX, scaleY, skewX;
      if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
      if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
      if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
      if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
      return {
        translateX: e,
        translateY: f,
        rotate: Math.atan2(b, a) * degrees,
        skewX: Math.atan(skewX) * degrees,
        scaleX: scaleX,
        scaleY: scaleY
      };
    }

    var svgNode;

    /* eslint-disable no-undef */
    function parseCss(value) {
      const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
      return m.isIdentity ? identity$1 : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
    }

    function parseSvg(value) {
      if (value == null) return identity$1;
      if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
      svgNode.setAttribute("transform", value);
      if (!(value = svgNode.transform.baseVal.consolidate())) return identity$1;
      value = value.matrix;
      return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
    }

    function interpolateTransform(parse, pxComma, pxParen, degParen) {

      function pop(s) {
        return s.length ? s.pop() + " " : "";
      }

      function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push("translate(", null, pxComma, null, pxParen);
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb || yb) {
          s.push("translate(" + xb + pxComma + yb + pxParen);
        }
      }

      function rotate(a, b, s, q) {
        if (a !== b) {
          if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
          q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "rotate(" + b + degParen);
        }
      }

      function skewX(a, b, s, q) {
        if (a !== b) {
          q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: interpolateNumber(a, b)});
        } else if (b) {
          s.push(pop(s) + "skewX(" + b + degParen);
        }
      }

      function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
          var i = s.push(pop(s) + "scale(", null, ",", null, ")");
          q.push({i: i - 4, x: interpolateNumber(xa, xb)}, {i: i - 2, x: interpolateNumber(ya, yb)});
        } else if (xb !== 1 || yb !== 1) {
          s.push(pop(s) + "scale(" + xb + "," + yb + ")");
        }
      }

      return function(a, b) {
        var s = [], // string constants and placeholders
            q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
          var i = -1, n = q.length, o;
          while (++i < n) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        };
      };
    }

    var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
    var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

    var epsilon2 = 1e-12;

    function cosh(x) {
      return ((x = Math.exp(x)) + 1 / x) / 2;
    }

    function sinh(x) {
      return ((x = Math.exp(x)) - 1 / x) / 2;
    }

    function tanh(x) {
      return ((x = Math.exp(2 * x)) - 1) / (x + 1);
    }

    var interpolateZoom = (function zoomRho(rho, rho2, rho4) {

      // p0 = [ux0, uy0, w0]
      // p1 = [ux1, uy1, w1]
      function zoom(p0, p1) {
        var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
            ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
            dx = ux1 - ux0,
            dy = uy1 - uy0,
            d2 = dx * dx + dy * dy,
            i,
            S;

        // Special case for u0 ≅ u1.
        if (d2 < epsilon2) {
          S = Math.log(w1 / w0) / rho;
          i = function(t) {
            return [
              ux0 + t * dx,
              uy0 + t * dy,
              w0 * Math.exp(rho * t * S)
            ];
          };
        }

        // General case.
        else {
          var d1 = Math.sqrt(d2),
              b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
              b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
              r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
              r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
          S = (r1 - r0) / rho;
          i = function(t) {
            var s = t * S,
                coshr0 = cosh(r0),
                u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
            return [
              ux0 + u * dx,
              uy0 + u * dy,
              w0 * coshr0 / cosh(rho * s + r0)
            ];
          };
        }

        i.duration = S * 1000 * rho / Math.SQRT2;

        return i;
      }

      zoom.rho = function(_) {
        var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
        return zoomRho(_1, _2, _4);
      };

      return zoom;
    })(Math.SQRT2, 2, 4);

    var frame = 0, // is an animation frame pending?
        timeout$1 = 0, // is a timeout pending?
        interval = 0, // are any timers active?
        pokeDelay = 1000, // how frequently we check for clock skew
        taskHead,
        taskTail,
        clockLast = 0,
        clockNow = 0,
        clockSkew = 0,
        clock = typeof performance === "object" && performance.now ? performance : Date,
        setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

    function now() {
      return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
    }

    function clearNow() {
      clockNow = 0;
    }

    function Timer() {
      this._call =
      this._time =
      this._next = null;
    }

    Timer.prototype = timer.prototype = {
      constructor: Timer,
      restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
          if (taskTail) taskTail._next = this;
          else taskHead = this;
          taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
      },
      stop: function() {
        if (this._call) {
          this._call = null;
          this._time = Infinity;
          sleep();
        }
      }
    };

    function timer(callback, delay, time) {
      var t = new Timer;
      t.restart(callback, delay, time);
      return t;
    }

    function timerFlush() {
      now(); // Get the current time, if not already set.
      ++frame; // Pretend we’ve set an alarm, if we haven’t already.
      var t = taskHead, e;
      while (t) {
        if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
        t = t._next;
      }
      --frame;
    }

    function wake() {
      clockNow = (clockLast = clock.now()) + clockSkew;
      frame = timeout$1 = 0;
      try {
        timerFlush();
      } finally {
        frame = 0;
        nap();
        clockNow = 0;
      }
    }

    function poke() {
      var now = clock.now(), delay = now - clockLast;
      if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
    }

    function nap() {
      var t0, t1 = taskHead, t2, time = Infinity;
      while (t1) {
        if (t1._call) {
          if (time > t1._time) time = t1._time;
          t0 = t1, t1 = t1._next;
        } else {
          t2 = t1._next, t1._next = null;
          t1 = t0 ? t0._next = t2 : taskHead = t2;
        }
      }
      taskTail = t0;
      sleep(time);
    }

    function sleep(time) {
      if (frame) return; // Soonest alarm already set, or will be.
      if (timeout$1) timeout$1 = clearTimeout(timeout$1);
      var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
      if (delay > 24) {
        if (time < Infinity) timeout$1 = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
      } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
      }
    }

    function timeout(callback, delay, time) {
      var t = new Timer;
      delay = delay == null ? 0 : +delay;
      t.restart(elapsed => {
        t.stop();
        callback(elapsed + delay);
      }, delay, time);
      return t;
    }

    var emptyOn = dispatch("start", "end", "cancel", "interrupt");
    var emptyTween = [];

    var CREATED = 0;
    var SCHEDULED = 1;
    var STARTING = 2;
    var STARTED = 3;
    var RUNNING = 4;
    var ENDING = 5;
    var ENDED = 6;

    function schedule(node, name, id, index, group, timing) {
      var schedules = node.__transition;
      if (!schedules) node.__transition = {};
      else if (id in schedules) return;
      create(node, id, {
        name: name,
        index: index, // For context during callback.
        group: group, // For context during callback.
        on: emptyOn,
        tween: emptyTween,
        time: timing.time,
        delay: timing.delay,
        duration: timing.duration,
        ease: timing.ease,
        timer: null,
        state: CREATED
      });
    }

    function init(node, id) {
      var schedule = get(node, id);
      if (schedule.state > CREATED) throw new Error("too late; already scheduled");
      return schedule;
    }

    function set(node, id) {
      var schedule = get(node, id);
      if (schedule.state > STARTED) throw new Error("too late; already running");
      return schedule;
    }

    function get(node, id) {
      var schedule = node.__transition;
      if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
      return schedule;
    }

    function create(node, id, self) {
      var schedules = node.__transition,
          tween;

      // Initialize the self timer when the transition is created.
      // Note the actual delay is not known until the first callback!
      schedules[id] = self;
      self.timer = timer(schedule, 0, self.time);

      function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);

        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
      }

      function start(elapsed) {
        var i, j, n, o;

        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();

        for (i in schedules) {
          o = schedules[i];
          if (o.name !== self.name) continue;

          // While this element already has a starting transition during this frame,
          // defer starting an interrupting transition until that transition has a
          // chance to tick (and possibly end); see d3/d3-transition#54!
          if (o.state === STARTED) return timeout(start);

          // Interrupt the active transition, if any.
          if (o.state === RUNNING) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("interrupt", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }

          // Cancel any pre-empted transitions.
          else if (+i < id) {
            o.state = ENDED;
            o.timer.stop();
            o.on.call("cancel", node, node.__data__, o.index, o.group);
            delete schedules[i];
          }
        }

        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        timeout(function() {
          if (self.state === STARTED) {
            self.state = RUNNING;
            self.timer.restart(tick, self.delay, self.time);
            tick(elapsed);
          }
        });

        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;

        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for (i = 0, j = -1; i < n; ++i) {
          if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
            tween[++j] = o;
          }
        }
        tween.length = j + 1;
      }

      function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
            i = -1,
            n = tween.length;

        while (++i < n) {
          tween[i].call(node, t);
        }

        // Dispatch the end event.
        if (self.state === ENDING) {
          self.on.call("end", node, node.__data__, self.index, self.group);
          stop();
        }
      }

      function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for (var i in schedules) return; // eslint-disable-line no-unused-vars
        delete node.__transition;
      }
    }

    function interrupt(node, name) {
      var schedules = node.__transition,
          schedule,
          active,
          empty = true,
          i;

      if (!schedules) return;

      name = name == null ? null : name + "";

      for (i in schedules) {
        if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
        active = schedule.state > STARTING && schedule.state < ENDING;
        schedule.state = ENDED;
        schedule.timer.stop();
        schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
        delete schedules[i];
      }

      if (empty) delete node.__transition;
    }

    function selection_interrupt(name) {
      return this.each(function() {
        interrupt(this, name);
      });
    }

    function tweenRemove(id, name) {
      var tween0, tween1;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = tween0 = tween;
          for (var i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1 = tween1.slice();
              tween1.splice(i, 1);
              break;
            }
          }
        }

        schedule.tween = tween1;
      };
    }

    function tweenFunction(id, name, value) {
      var tween0, tween1;
      if (typeof value !== "function") throw new Error;
      return function() {
        var schedule = set(this, id),
            tween = schedule.tween;

        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
          tween1 = (tween0 = tween).slice();
          for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
            if (tween1[i].name === name) {
              tween1[i] = t;
              break;
            }
          }
          if (i === n) tween1.push(t);
        }

        schedule.tween = tween1;
      };
    }

    function transition_tween(name, value) {
      var id = this._id;

      name += "";

      if (arguments.length < 2) {
        var tween = get(this.node(), id).tween;
        for (var i = 0, n = tween.length, t; i < n; ++i) {
          if ((t = tween[i]).name === name) {
            return t.value;
          }
        }
        return null;
      }

      return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    }

    function tweenValue(transition, name, value) {
      var id = transition._id;

      transition.each(function() {
        var schedule = set(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
      });

      return function(node) {
        return get(node, id).value[name];
      };
    }

    function interpolate(a, b) {
      var c;
      return (typeof b === "number" ? interpolateNumber
          : b instanceof color ? interpolateRgb
          : (c = color(b)) ? (b = c, interpolateRgb)
          : interpolateString)(a, b);
    }

    function attrRemove(name) {
      return function() {
        this.removeAttribute(name);
      };
    }

    function attrRemoveNS(fullname) {
      return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
      };
    }

    function attrConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrConstantNS(fullname, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function attrFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function attrFunctionNS(fullname, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function transition_attr(name, value) {
      var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
      return this.attrTween(name, typeof value === "function"
          ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
          : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
          : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    }

    function attrInterpolate(name, i) {
      return function(t) {
        this.setAttribute(name, i.call(this, t));
      };
    }

    function attrInterpolateNS(fullname, i) {
      return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
      };
    }

    function attrTweenNS(fullname, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function attrTween(name, value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_attrTween(name, value) {
      var key = "attr." + name;
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      var fullname = namespace(name);
      return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    }

    function delayFunction(id, value) {
      return function() {
        init(this, id).delay = +value.apply(this, arguments);
      };
    }

    function delayConstant(id, value) {
      return value = +value, function() {
        init(this, id).delay = value;
      };
    }

    function transition_delay(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? delayFunction
              : delayConstant)(id, value))
          : get(this.node(), id).delay;
    }

    function durationFunction(id, value) {
      return function() {
        set(this, id).duration = +value.apply(this, arguments);
      };
    }

    function durationConstant(id, value) {
      return value = +value, function() {
        set(this, id).duration = value;
      };
    }

    function transition_duration(value) {
      var id = this._id;

      return arguments.length
          ? this.each((typeof value === "function"
              ? durationFunction
              : durationConstant)(id, value))
          : get(this.node(), id).duration;
    }

    function easeConstant(id, value) {
      if (typeof value !== "function") throw new Error;
      return function() {
        set(this, id).ease = value;
      };
    }

    function transition_ease(value) {
      var id = this._id;

      return arguments.length
          ? this.each(easeConstant(id, value))
          : get(this.node(), id).ease;
    }

    function easeVarying(id, value) {
      return function() {
        var v = value.apply(this, arguments);
        if (typeof v !== "function") throw new Error;
        set(this, id).ease = v;
      };
    }

    function transition_easeVarying(value) {
      if (typeof value !== "function") throw new Error;
      return this.each(easeVarying(this._id, value));
    }

    function transition_filter(match) {
      if (typeof match !== "function") match = matcher(match);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
          if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
            subgroup.push(node);
          }
        }
      }

      return new Transition(subgroups, this._parents, this._name, this._id);
    }

    function transition_merge(transition) {
      if (transition._id !== this._id) throw new Error;

      for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
        for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
          if (node = group0[i] || group1[i]) {
            merge[i] = node;
          }
        }
      }

      for (; j < m0; ++j) {
        merges[j] = groups0[j];
      }

      return new Transition(merges, this._parents, this._name, this._id);
    }

    function start(name) {
      return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
      });
    }

    function onFunction(id, name, listener) {
      var on0, on1, sit = start(name) ? init : set;
      return function() {
        var schedule = sit(this, id),
            on = schedule.on;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

        schedule.on = on1;
      };
    }

    function transition_on(name, listener) {
      var id = this._id;

      return arguments.length < 2
          ? get(this.node(), id).on.on(name)
          : this.each(onFunction(id, name, listener));
    }

    function removeFunction(id) {
      return function() {
        var parent = this.parentNode;
        for (var i in this.__transition) if (+i !== id) return;
        if (parent) parent.removeChild(this);
      };
    }

    function transition_remove() {
      return this.on("end.remove", removeFunction(this._id));
    }

    function transition_select(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selector(select);

      for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
          if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
            if ("__data__" in node) subnode.__data__ = node.__data__;
            subgroup[i] = subnode;
            schedule(subgroup[i], name, id, i, subgroup, get(node, id));
          }
        }
      }

      return new Transition(subgroups, this._parents, name, id);
    }

    function transition_selectAll(select) {
      var name = this._name,
          id = this._id;

      if (typeof select !== "function") select = selectorAll(select);

      for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            for (var children = select.call(node, node.__data__, i, group), child, inherit = get(node, id), k = 0, l = children.length; k < l; ++k) {
              if (child = children[k]) {
                schedule(child, name, id, k, children, inherit);
              }
            }
            subgroups.push(children);
            parents.push(node);
          }
        }
      }

      return new Transition(subgroups, parents, name, id);
    }

    var Selection = selection.prototype.constructor;

    function transition_selection() {
      return new Selection(this._groups, this._parents);
    }

    function styleNull(name, interpolate) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            string1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, string10 = string1);
      };
    }

    function styleRemove(name) {
      return function() {
        this.style.removeProperty(name);
      };
    }

    function styleConstant(name, interpolate, value1) {
      var string00,
          string1 = value1 + "",
          interpolate0;
      return function() {
        var string0 = styleValue(this, name);
        return string0 === string1 ? null
            : string0 === string00 ? interpolate0
            : interpolate0 = interpolate(string00 = string0, value1);
      };
    }

    function styleFunction(name, interpolate, value) {
      var string00,
          string10,
          interpolate0;
      return function() {
        var string0 = styleValue(this, name),
            value1 = value(this),
            string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
        return string0 === string1 ? null
            : string0 === string00 && string1 === string10 ? interpolate0
            : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
      };
    }

    function styleMaybeRemove(id, name) {
      var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
      return function() {
        var schedule = set(this, id),
            on = schedule.on,
            listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

        schedule.on = on1;
      };
    }

    function transition_style(name, value, priority) {
      var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
      return value == null ? this
          .styleTween(name, styleNull(name, i))
          .on("end.style." + name, styleRemove(name))
        : typeof value === "function" ? this
          .styleTween(name, styleFunction(name, i, tweenValue(this, "style." + name, value)))
          .each(styleMaybeRemove(this._id, name))
        : this
          .styleTween(name, styleConstant(name, i, value), priority)
          .on("end.style." + name, null);
    }

    function styleInterpolate(name, i, priority) {
      return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
      };
    }

    function styleTween(name, value, priority) {
      var t, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
      }
      tween._value = value;
      return tween;
    }

    function transition_styleTween(name, value, priority) {
      var key = "style." + (name += "");
      if (arguments.length < 2) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    }

    function textConstant(value) {
      return function() {
        this.textContent = value;
      };
    }

    function textFunction(value) {
      return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
      };
    }

    function transition_text(value) {
      return this.tween("text", typeof value === "function"
          ? textFunction(tweenValue(this, "text", value))
          : textConstant(value == null ? "" : value + ""));
    }

    function textInterpolate(i) {
      return function(t) {
        this.textContent = i.call(this, t);
      };
    }

    function textTween(value) {
      var t0, i0;
      function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
      }
      tween._value = value;
      return tween;
    }

    function transition_textTween(value) {
      var key = "text";
      if (arguments.length < 1) return (key = this.tween(key)) && key._value;
      if (value == null) return this.tween(key, null);
      if (typeof value !== "function") throw new Error;
      return this.tween(key, textTween(value));
    }

    function transition_transition() {
      var name = this._name,
          id0 = this._id,
          id1 = newId();

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            var inherit = get(node, id0);
            schedule(node, name, id1, i, group, {
              time: inherit.time + inherit.delay + inherit.duration,
              delay: 0,
              duration: inherit.duration,
              ease: inherit.ease
            });
          }
        }
      }

      return new Transition(groups, this._parents, name, id1);
    }

    function transition_end() {
      var on0, on1, that = this, id = that._id, size = that.size();
      return new Promise(function(resolve, reject) {
        var cancel = {value: reject},
            end = {value: function() { if (--size === 0) resolve(); }};

        that.each(function() {
          var schedule = set(this, id),
              on = schedule.on;

          // If this node shared a dispatch with the previous node,
          // just assign the updated shared dispatch and we’re done!
          // Otherwise, copy-on-write.
          if (on !== on0) {
            on1 = (on0 = on).copy();
            on1._.cancel.push(cancel);
            on1._.interrupt.push(cancel);
            on1._.end.push(end);
          }

          schedule.on = on1;
        });

        // The selection was empty, resolve end immediately
        if (size === 0) resolve();
      });
    }

    var id = 0;

    function Transition(groups, parents, name, id) {
      this._groups = groups;
      this._parents = parents;
      this._name = name;
      this._id = id;
    }

    function newId() {
      return ++id;
    }

    var selection_prototype = selection.prototype;

    Transition.prototype = {
      constructor: Transition,
      select: transition_select,
      selectAll: transition_selectAll,
      selectChild: selection_prototype.selectChild,
      selectChildren: selection_prototype.selectChildren,
      filter: transition_filter,
      merge: transition_merge,
      selection: transition_selection,
      transition: transition_transition,
      call: selection_prototype.call,
      nodes: selection_prototype.nodes,
      node: selection_prototype.node,
      size: selection_prototype.size,
      empty: selection_prototype.empty,
      each: selection_prototype.each,
      on: transition_on,
      attr: transition_attr,
      attrTween: transition_attrTween,
      style: transition_style,
      styleTween: transition_styleTween,
      text: transition_text,
      textTween: transition_textTween,
      remove: transition_remove,
      tween: transition_tween,
      delay: transition_delay,
      duration: transition_duration,
      ease: transition_ease,
      easeVarying: transition_easeVarying,
      end: transition_end,
      [Symbol.iterator]: selection_prototype[Symbol.iterator]
    };

    function cubicInOut(t) {
      return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
    }

    var defaultTiming = {
      time: null, // Set on use.
      delay: 0,
      duration: 250,
      ease: cubicInOut
    };

    function inherit(node, id) {
      var timing;
      while (!(timing = node.__transition) || !(timing = timing[id])) {
        if (!(node = node.parentNode)) {
          throw new Error(`transition ${id} not found`);
        }
      }
      return timing;
    }

    function selection_transition(name) {
      var id,
          timing;

      if (name instanceof Transition) {
        id = name._id, name = name._name;
      } else {
        id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
      }

      for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
        for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
          if (node = group[i]) {
            schedule(node, name, id, i, group, timing || inherit(node, id));
          }
        }
      }

      return new Transition(groups, this._parents, name, id);
    }

    selection.prototype.interrupt = selection_interrupt;
    selection.prototype.transition = selection_transition;

    var constant = x => () => x;

    function ZoomEvent(type, {
      sourceEvent,
      target,
      transform,
      dispatch
    }) {
      Object.defineProperties(this, {
        type: {value: type, enumerable: true, configurable: true},
        sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
        target: {value: target, enumerable: true, configurable: true},
        transform: {value: transform, enumerable: true, configurable: true},
        _: {value: dispatch}
      });
    }

    function Transform(k, x, y) {
      this.k = k;
      this.x = x;
      this.y = y;
    }

    Transform.prototype = {
      constructor: Transform,
      scale: function(k) {
        return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
      },
      translate: function(x, y) {
        return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
      },
      apply: function(point) {
        return [point[0] * this.k + this.x, point[1] * this.k + this.y];
      },
      applyX: function(x) {
        return x * this.k + this.x;
      },
      applyY: function(y) {
        return y * this.k + this.y;
      },
      invert: function(location) {
        return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
      },
      invertX: function(x) {
        return (x - this.x) / this.k;
      },
      invertY: function(y) {
        return (y - this.y) / this.k;
      },
      rescaleX: function(x) {
        return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
      },
      rescaleY: function(y) {
        return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
      },
      toString: function() {
        return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
      }
    };

    var identity = new Transform(1, 0, 0);

    transform.prototype = Transform.prototype;

    function transform(node) {
      while (!node.__zoom) if (!(node = node.parentNode)) return identity;
      return node.__zoom;
    }

    function nopropagation(event) {
      event.stopImmediatePropagation();
    }

    function noevent(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    // Ignore right-click, since that should open the context menu.
    // except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
    function defaultFilter(event) {
      return (!event.ctrlKey || event.type === 'wheel') && !event.button;
    }

    function defaultExtent() {
      var e = this;
      if (e instanceof SVGElement) {
        e = e.ownerSVGElement || e;
        if (e.hasAttribute("viewBox")) {
          e = e.viewBox.baseVal;
          return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
        }
        return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
      }
      return [[0, 0], [e.clientWidth, e.clientHeight]];
    }

    function defaultTransform() {
      return this.__zoom || identity;
    }

    function defaultWheelDelta(event) {
      return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
    }

    function defaultTouchable() {
      return navigator.maxTouchPoints || ("ontouchstart" in this);
    }

    function defaultConstrain(transform, extent, translateExtent) {
      var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
          dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
          dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
          dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
      return transform.translate(
        dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
        dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
      );
    }

    function zoom() {
      var filter = defaultFilter,
          extent = defaultExtent,
          constrain = defaultConstrain,
          wheelDelta = defaultWheelDelta,
          touchable = defaultTouchable,
          scaleExtent = [0, Infinity],
          translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
          duration = 250,
          interpolate = interpolateZoom,
          listeners = dispatch("start", "zoom", "end"),
          touchstarting,
          touchfirst,
          touchending,
          touchDelay = 500,
          wheelDelay = 150,
          clickDistance2 = 0,
          tapDistance = 10;

      function zoom(selection) {
        selection
            .property("__zoom", defaultTransform)
            .on("wheel.zoom", wheeled, {passive: false})
            .on("mousedown.zoom", mousedowned)
            .on("dblclick.zoom", dblclicked)
          .filter(touchable)
            .on("touchstart.zoom", touchstarted)
            .on("touchmove.zoom", touchmoved)
            .on("touchend.zoom touchcancel.zoom", touchended)
            .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
      }

      zoom.transform = function(collection, transform, point, event) {
        var selection = collection.selection ? collection.selection() : collection;
        selection.property("__zoom", defaultTransform);
        if (collection !== selection) {
          schedule(collection, transform, point, event);
        } else {
          selection.interrupt().each(function() {
            gesture(this, arguments)
              .event(event)
              .start()
              .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
              .end();
          });
        }
      };

      zoom.scaleBy = function(selection, k, p, event) {
        zoom.scaleTo(selection, function() {
          var k0 = this.__zoom.k,
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return k0 * k1;
        }, p, event);
      };

      zoom.scaleTo = function(selection, k, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t0 = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
              p1 = t0.invert(p0),
              k1 = typeof k === "function" ? k.apply(this, arguments) : k;
          return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
        }, p, event);
      };

      zoom.translateBy = function(selection, x, y, event) {
        zoom.transform(selection, function() {
          return constrain(this.__zoom.translate(
            typeof x === "function" ? x.apply(this, arguments) : x,
            typeof y === "function" ? y.apply(this, arguments) : y
          ), extent.apply(this, arguments), translateExtent);
        }, null, event);
      };

      zoom.translateTo = function(selection, x, y, p, event) {
        zoom.transform(selection, function() {
          var e = extent.apply(this, arguments),
              t = this.__zoom,
              p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
          return constrain(identity.translate(p0[0], p0[1]).scale(t.k).translate(
            typeof x === "function" ? -x.apply(this, arguments) : -x,
            typeof y === "function" ? -y.apply(this, arguments) : -y
          ), e, translateExtent);
        }, p, event);
      };

      function scale(transform, k) {
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
        return k === transform.k ? transform : new Transform(k, transform.x, transform.y);
      }

      function translate(transform, p0, p1) {
        var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
        return x === transform.x && y === transform.y ? transform : new Transform(transform.k, x, y);
      }

      function centroid(extent) {
        return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
      }

      function schedule(transition, transform, point, event) {
        transition
            .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
            .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
            .tween("zoom", function() {
              var that = this,
                  args = arguments,
                  g = gesture(that, args).event(event),
                  e = extent.apply(that, args),
                  p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
                  w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
                  a = that.__zoom,
                  b = typeof transform === "function" ? transform.apply(that, args) : transform,
                  i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
              return function(t) {
                if (t === 1) t = b; // Avoid rounding error on end.
                else { var l = i(t), k = w / l[2]; t = new Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
                g.zoom(null, t);
              };
            });
      }

      function gesture(that, args, clean) {
        return (!clean && that.__zooming) || new Gesture(that, args);
      }

      function Gesture(that, args) {
        this.that = that;
        this.args = args;
        this.active = 0;
        this.sourceEvent = null;
        this.extent = extent.apply(that, args);
        this.taps = 0;
      }

      Gesture.prototype = {
        event: function(event) {
          if (event) this.sourceEvent = event;
          return this;
        },
        start: function() {
          if (++this.active === 1) {
            this.that.__zooming = this;
            this.emit("start");
          }
          return this;
        },
        zoom: function(key, transform) {
          if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
          if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
          if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
          this.that.__zoom = transform;
          this.emit("zoom");
          return this;
        },
        end: function() {
          if (--this.active === 0) {
            delete this.that.__zooming;
            this.emit("end");
          }
          return this;
        },
        emit: function(type) {
          var d = select(this.that).datum();
          listeners.call(
            type,
            this.that,
            new ZoomEvent(type, {
              sourceEvent: this.sourceEvent,
              target: zoom,
              type,
              transform: this.that.__zoom,
              dispatch: listeners
            }),
            d
          );
        }
      };

      function wheeled(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var g = gesture(this, args).event(event),
            t = this.__zoom,
            k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
            p = pointer(event);

        // If the mouse is in the same location as before, reuse it.
        // If there were recent wheel events, reset the wheel idle timeout.
        if (g.wheel) {
          if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
            g.mouse[1] = t.invert(g.mouse[0] = p);
          }
          clearTimeout(g.wheel);
        }

        // If this wheel event won’t trigger a transform change, ignore it.
        else if (t.k === k) return;

        // Otherwise, capture the mouse point and location at the start.
        else {
          g.mouse = [p, t.invert(p)];
          interrupt(this);
          g.start();
        }

        noevent(event);
        g.wheel = setTimeout(wheelidled, wheelDelay);
        g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

        function wheelidled() {
          g.wheel = null;
          g.end();
        }
      }

      function mousedowned(event, ...args) {
        if (touchending || !filter.apply(this, arguments)) return;
        var currentTarget = event.currentTarget,
            g = gesture(this, args, true).event(event),
            v = select(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
            p = pointer(event, currentTarget),
            x0 = event.clientX,
            y0 = event.clientY;

        dragDisable(event.view);
        nopropagation(event);
        g.mouse = [p, this.__zoom.invert(p)];
        interrupt(this);
        g.start();

        function mousemoved(event) {
          noevent(event);
          if (!g.moved) {
            var dx = event.clientX - x0, dy = event.clientY - y0;
            g.moved = dx * dx + dy * dy > clickDistance2;
          }
          g.event(event)
           .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = pointer(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
        }

        function mouseupped(event) {
          v.on("mousemove.zoom mouseup.zoom", null);
          yesdrag(event.view, g.moved);
          noevent(event);
          g.event(event).end();
        }
      }

      function dblclicked(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var t0 = this.__zoom,
            p0 = pointer(event.changedTouches ? event.changedTouches[0] : event, this),
            p1 = t0.invert(p0),
            k1 = t0.k * (event.shiftKey ? 0.5 : 2),
            t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

        noevent(event);
        if (duration > 0) select(this).transition().duration(duration).call(schedule, t1, p0, event);
        else select(this).call(zoom.transform, t1, p0, event);
      }

      function touchstarted(event, ...args) {
        if (!filter.apply(this, arguments)) return;
        var touches = event.touches,
            n = touches.length,
            g = gesture(this, args, event.changedTouches.length === n).event(event),
            started, i, t, p;

        nopropagation(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          p = [p, this.__zoom.invert(p), t.identifier];
          if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
          else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
        }

        if (touchstarting) touchstarting = clearTimeout(touchstarting);

        if (started) {
          if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
          interrupt(this);
          g.start();
        }
      }

      function touchmoved(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t, p, l;

        noevent(event);
        for (i = 0; i < n; ++i) {
          t = touches[i], p = pointer(t, this);
          if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
          else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
        }
        t = g.that.__zoom;
        if (g.touch1) {
          var p0 = g.touch0[0], l0 = g.touch0[1],
              p1 = g.touch1[0], l1 = g.touch1[1],
              dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
              dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
          t = scale(t, Math.sqrt(dp / dl));
          p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
          l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
        }
        else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
        else return;

        g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
      }

      function touchended(event, ...args) {
        if (!this.__zooming) return;
        var g = gesture(this, args).event(event),
            touches = event.changedTouches,
            n = touches.length, i, t;

        nopropagation(event);
        if (touchending) clearTimeout(touchending);
        touchending = setTimeout(function() { touchending = null; }, touchDelay);
        for (i = 0; i < n; ++i) {
          t = touches[i];
          if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
          else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
        }
        if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
        if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
        else {
          g.end();
          // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
          if (g.taps === 2) {
            t = pointer(t, this);
            if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
              var p = select(this).on("dblclick.zoom");
              if (p) p.apply(this, arguments);
            }
          }
        }
      }

      zoom.wheelDelta = function(_) {
        return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : constant(+_), zoom) : wheelDelta;
      };

      zoom.filter = function(_) {
        return arguments.length ? (filter = typeof _ === "function" ? _ : constant(!!_), zoom) : filter;
      };

      zoom.touchable = function(_) {
        return arguments.length ? (touchable = typeof _ === "function" ? _ : constant(!!_), zoom) : touchable;
      };

      zoom.extent = function(_) {
        return arguments.length ? (extent = typeof _ === "function" ? _ : constant([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
      };

      zoom.scaleExtent = function(_) {
        return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
      };

      zoom.translateExtent = function(_) {
        return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
      };

      zoom.constrain = function(_) {
        return arguments.length ? (constrain = _, zoom) : constrain;
      };

      zoom.duration = function(_) {
        return arguments.length ? (duration = +_, zoom) : duration;
      };

      zoom.interpolate = function(_) {
        return arguments.length ? (interpolate = _, zoom) : interpolate;
      };

      zoom.on = function() {
        var value = listeners.on.apply(listeners, arguments);
        return value === listeners ? zoom : value;
      };

      zoom.clickDistance = function(_) {
        return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
      };

      zoom.tapDistance = function(_) {
        return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
      };

      return zoom;
    }

    /* node_modules/svelvet/Edges/EdgeText.svelte generated by Svelte v3.55.1 */

    const file$d = "node_modules/svelvet/Edges/EdgeText.svelte";

    // (25:0) {:else}
    function create_else_block$4(ctx) {
    	let g;
    	let rect;
    	let rect_fill_value;
    	let rect_x_value;
    	let rect_y_value;
    	let text_1;
    	let t;
    	let text_1_fill_value;

    	const block = {
    		c: function create() {
    			g = svg_element("g");
    			rect = svg_element("rect");
    			text_1 = svg_element("text");
    			t = text(/*label*/ ctx[0]);
    			attr_dev(rect, "class", "EdgeTextBg");
    			attr_dev(rect, "data-testid", "edge-text-bg");

    			attr_dev(rect, "fill", rect_fill_value = /*labelBgColor*/ ctx[5]
    			? /*labelBgColor*/ ctx[5]
    			: 'white');

    			attr_dev(rect, "x", rect_x_value = /*textCenterX*/ ctx[3] - /*labelPx*/ ctx[1] / 2);
    			attr_dev(rect, "y", rect_y_value = /*textCenterY*/ ctx[2] - shiftRectY);
    			attr_dev(rect, "width", /*labelPx*/ ctx[1]);
    			attr_dev(rect, "height", 16);
    			add_location(rect, file$d, 26, 4, 779);
    			attr_dev(text_1, "class", "EdgeText");
    			attr_dev(text_1, "x", /*textCenterX*/ ctx[3]);
    			attr_dev(text_1, "y", /*textCenterY*/ ctx[2]);
    			attr_dev(text_1, "font-size", "12px");
    			attr_dev(text_1, "dominant-baseline", "central");
    			attr_dev(text_1, "text-anchor", "middle");

    			attr_dev(text_1, "fill", text_1_fill_value = /*labelTextColor*/ ctx[4]
    			? /*labelTextColor*/ ctx[4]
    			: 'black');

    			add_location(text_1, file$d, 35, 4, 1016);
    			add_location(g, file$d, 25, 2, 771);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, g, anchor);
    			append_dev(g, rect);
    			append_dev(g, text_1);
    			append_dev(text_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*labelBgColor*/ 32 && rect_fill_value !== (rect_fill_value = /*labelBgColor*/ ctx[5]
    			? /*labelBgColor*/ ctx[5]
    			: 'white')) {
    				attr_dev(rect, "fill", rect_fill_value);
    			}

    			if (dirty & /*textCenterX, labelPx*/ 10 && rect_x_value !== (rect_x_value = /*textCenterX*/ ctx[3] - /*labelPx*/ ctx[1] / 2)) {
    				attr_dev(rect, "x", rect_x_value);
    			}

    			if (dirty & /*textCenterY*/ 4 && rect_y_value !== (rect_y_value = /*textCenterY*/ ctx[2] - shiftRectY)) {
    				attr_dev(rect, "y", rect_y_value);
    			}

    			if (dirty & /*labelPx*/ 2) {
    				attr_dev(rect, "width", /*labelPx*/ ctx[1]);
    			}

    			if (dirty & /*label*/ 1) set_data_dev(t, /*label*/ ctx[0]);

    			if (dirty & /*textCenterX*/ 8) {
    				attr_dev(text_1, "x", /*textCenterX*/ ctx[3]);
    			}

    			if (dirty & /*textCenterY*/ 4) {
    				attr_dev(text_1, "y", /*textCenterY*/ ctx[2]);
    			}

    			if (dirty & /*labelTextColor*/ 16 && text_1_fill_value !== (text_1_fill_value = /*labelTextColor*/ ctx[4]
    			? /*labelTextColor*/ ctx[4]
    			: 'black')) {
    				attr_dev(text_1, "fill", text_1_fill_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(g);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$4.name,
    		type: "else",
    		source: "(25:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (23:0) {#if typeof label === 'undefined' || !label}
    function create_if_block$6(ctx) {
    	let t_value = null + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(23:0) {#if typeof label === 'undefined' || !label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$h(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (typeof /*label*/ ctx[0] === 'undefined' || !/*label*/ ctx[0]) return create_if_block$6;
    		return create_else_block$4;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const shiftRectY = 7;

    function instance$h($$self, $$props, $$invalidate) {
    	let label;
    	let labelBgColor;
    	let labelTextColor;
    	let centerX;
    	let centerY;
    	let pxRatio;
    	let textCenterX;
    	let textCenterY;
    	let spaces;
    	let newLength;
    	let labelPx;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EdgeText', slots, []);
    	let { edgeTextProps } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edgeTextProps === undefined && !('edgeTextProps' in $$props || $$self.$$.bound[$$self.$$.props['edgeTextProps']])) {
    			console.warn("<EdgeText> was created without expected prop 'edgeTextProps'");
    		}
    	});

    	const writable_props = ['edgeTextProps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EdgeText> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edgeTextProps' in $$props) $$invalidate(6, edgeTextProps = $$props.edgeTextProps);
    	};

    	$$self.$capture_state = () => ({
    		edgeTextProps,
    		shiftRectY,
    		pxRatio,
    		newLength,
    		labelPx,
    		spaces,
    		label,
    		centerY,
    		textCenterY,
    		centerX,
    		textCenterX,
    		labelTextColor,
    		labelBgColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('edgeTextProps' in $$props) $$invalidate(6, edgeTextProps = $$props.edgeTextProps);
    		if ('pxRatio' in $$props) $$invalidate(7, pxRatio = $$props.pxRatio);
    		if ('newLength' in $$props) $$invalidate(8, newLength = $$props.newLength);
    		if ('labelPx' in $$props) $$invalidate(1, labelPx = $$props.labelPx);
    		if ('spaces' in $$props) $$invalidate(9, spaces = $$props.spaces);
    		if ('label' in $$props) $$invalidate(0, label = $$props.label);
    		if ('centerY' in $$props) $$invalidate(10, centerY = $$props.centerY);
    		if ('textCenterY' in $$props) $$invalidate(2, textCenterY = $$props.textCenterY);
    		if ('centerX' in $$props) $$invalidate(11, centerX = $$props.centerX);
    		if ('textCenterX' in $$props) $$invalidate(3, textCenterX = $$props.textCenterX);
    		if ('labelTextColor' in $$props) $$invalidate(4, labelTextColor = $$props.labelTextColor);
    		if ('labelBgColor' in $$props) $$invalidate(5, labelBgColor = $$props.labelBgColor);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edgeTextProps*/ 64) {
    			$$invalidate(0, { label, labelBgColor, labelTextColor, centerX, centerY } = edgeTextProps, label, ($$invalidate(5, labelBgColor), $$invalidate(6, edgeTextProps)), ($$invalidate(4, labelTextColor), $$invalidate(6, edgeTextProps)), ($$invalidate(11, centerX), $$invalidate(6, edgeTextProps)), ($$invalidate(10, centerY), $$invalidate(6, edgeTextProps)));
    		}

    		if ($$self.$$.dirty & /*label*/ 1) {
    			$$invalidate(7, pxRatio = label.length < 3 ? 9 : 7);
    		}

    		if ($$self.$$.dirty & /*centerX*/ 2048) {
    			// determine the center point of the edge to be used in the EdgeText component
    			$$invalidate(3, textCenterX = centerX);
    		}

    		if ($$self.$$.dirty & /*centerY*/ 1024) {
    			$$invalidate(2, textCenterY = centerY);
    		}

    		if ($$self.$$.dirty & /*label*/ 1) {
    			// determine width of rect to render based on label.length (removing spaces)
    			// pxRatio is an estimate of how many pixels 1 character might take up
    			// pxRatio not 100% accurate as font is not monospace
    			$$invalidate(9, spaces = label.split(' ').length - 1);
    		}

    		if ($$self.$$.dirty & /*label, spaces*/ 513) {
    			$$invalidate(8, newLength = label.length - spaces);
    		}

    		if ($$self.$$.dirty & /*newLength, pxRatio*/ 384) {
    			$$invalidate(1, labelPx = newLength * pxRatio);
    		}
    	};

    	return [
    		label,
    		labelPx,
    		textCenterY,
    		textCenterX,
    		labelTextColor,
    		labelBgColor,
    		edgeTextProps,
    		pxRatio,
    		newLength,
    		spaces,
    		centerY,
    		centerX
    	];
    }

    class EdgeText extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, { edgeTextProps: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EdgeText",
    			options,
    			id: create_fragment$h.name
    		});
    	}

    	get edgeTextProps() {
    		throw new Error("<EdgeText>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edgeTextProps(value) {
    		throw new Error("<EdgeText>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/BaseEdge.svelte generated by Svelte v3.55.1 */
    const file$c = "node_modules/svelvet/Edges/BaseEdge.svelte";

    // (41:0) {:else}
    function create_else_block$3(ctx) {
    	let path_1;
    	let path_1_class_value;
    	let path_1_stroke_value;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "class", path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-3i14vf"));
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", "transparent");
    			attr_dev(path_1, "stroke", path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray');
    			attr_dev(path_1, "aria-label", "svg-path");
    			add_location(path_1, file$c, 41, 2, 891);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*animate*/ 8 && path_1_class_value !== (path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-3i14vf"))) {
    				attr_dev(path_1, "class", path_1_class_value);
    			}

    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*edgeColor*/ 2 && path_1_stroke_value !== (path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray')) {
    				attr_dev(path_1, "stroke", path_1_stroke_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(41:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (32:0) {#if arrow}
    function create_if_block_1$3(ctx) {
    	let path_1;
    	let path_1_class_value;
    	let path_1_stroke_value;

    	const block = {
    		c: function create() {
    			path_1 = svg_element("path");
    			attr_dev(path_1, "class", path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-3i14vf"));
    			attr_dev(path_1, "d", /*path*/ ctx[4]);
    			attr_dev(path_1, "fill", "transparent");
    			attr_dev(path_1, "stroke", path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray');
    			attr_dev(path_1, "marker-end", "url(#arrow)");
    			attr_dev(path_1, "aria-label", "svg-path");
    			add_location(path_1, file$c, 32, 2, 698);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path_1, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*animate*/ 8 && path_1_class_value !== (path_1_class_value = "" + (null_to_empty(/*animate*/ ctx[3] ? 'animate' : '') + " svelte-3i14vf"))) {
    				attr_dev(path_1, "class", path_1_class_value);
    			}

    			if (dirty & /*path*/ 16) {
    				attr_dev(path_1, "d", /*path*/ ctx[4]);
    			}

    			if (dirty & /*edgeColor*/ 2 && path_1_stroke_value !== (path_1_stroke_value = /*edgeColor*/ ctx[1] ? /*edgeColor*/ ctx[1] : 'gray')) {
    				attr_dev(path_1, "stroke", path_1_stroke_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(32:0) {#if arrow}",
    		ctx
    	});

    	return block;
    }

    // (51:0) {#if edgeTextProps.label}
    function create_if_block$5(ctx) {
    	let edgetext;
    	let current;

    	edgetext = new EdgeText({
    			props: { edgeTextProps: /*edgeTextProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(edgetext.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(edgetext, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const edgetext_changes = {};
    			if (dirty & /*edgeTextProps*/ 1) edgetext_changes.edgeTextProps = /*edgeTextProps*/ ctx[0];
    			edgetext.$set(edgetext_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(edgetext.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(edgetext.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(edgetext, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(51:0) {#if edgeTextProps.label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let defs;
    	let marker;
    	let polygon;
    	let t0;
    	let t1;
    	let if_block1_anchor;
    	let current;

    	function select_block_type(ctx, dirty) {
    		if (/*arrow*/ ctx[2]) return create_if_block_1$3;
    		return create_else_block$3;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block0 = current_block_type(ctx);
    	let if_block1 = /*edgeTextProps*/ ctx[0].label && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			defs = svg_element("defs");
    			marker = svg_element("marker");
    			polygon = svg_element("polygon");
    			t0 = space();
    			if_block0.c();
    			t1 = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty$1();
    			attr_dev(polygon, "points", /*defaultArrow*/ ctx[5]);
    			attr_dev(polygon, "fill", "gray");
    			add_location(polygon, file$c, 27, 4, 617);
    			attr_dev(marker, "id", "arrow");
    			attr_dev(marker, "markerWidth", "9");
    			attr_dev(marker, "markerHeight", "9");
    			attr_dev(marker, "refX", "8");
    			attr_dev(marker, "refY", "4");
    			attr_dev(marker, "orient", "auto");
    			add_location(marker, file$c, 26, 2, 528);
    			add_location(defs, file$c, 25, 0, 519);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, defs, anchor);
    			append_dev(defs, marker);
    			append_dev(marker, polygon);
    			insert_dev(target, t0, anchor);
    			if_block0.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block0) {
    				if_block0.p(ctx, dirty);
    			} else {
    				if_block0.d(1);
    				if_block0 = current_block_type(ctx);

    				if (if_block0) {
    					if_block0.c();
    					if_block0.m(t1.parentNode, t1);
    				}
    			}

    			if (/*edgeTextProps*/ ctx[0].label) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*edgeTextProps*/ 1) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$5(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(defs);
    			if (detaching) detach_dev(t0);
    			if_block0.d(detaching);
    			if (detaching) detach_dev(t1);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$g($$self, $$props, $$invalidate) {
    	let path;
    	let animate;
    	let arrow;
    	let label;
    	let labelBgColor;
    	let labelTextColor;
    	let edgeColor;
    	let centerX;
    	let centerY;
    	let edgeTextProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('BaseEdge', slots, []);
    	let { baseEdgeProps } = $$props;
    	const defaultArrow = `0 0, 9 4.5, 0 9`;

    	$$self.$$.on_mount.push(function () {
    		if (baseEdgeProps === undefined && !('baseEdgeProps' in $$props || $$self.$$.bound[$$self.$$.props['baseEdgeProps']])) {
    			console.warn("<BaseEdge> was created without expected prop 'baseEdgeProps'");
    		}
    	});

    	const writable_props = ['baseEdgeProps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<BaseEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('baseEdgeProps' in $$props) $$invalidate(6, baseEdgeProps = $$props.baseEdgeProps);
    	};

    	$$self.$capture_state = () => ({
    		EdgeText,
    		baseEdgeProps,
    		defaultArrow,
    		centerY,
    		centerX,
    		labelTextColor,
    		labelBgColor,
    		label,
    		edgeTextProps,
    		edgeColor,
    		arrow,
    		animate,
    		path
    	});

    	$$self.$inject_state = $$props => {
    		if ('baseEdgeProps' in $$props) $$invalidate(6, baseEdgeProps = $$props.baseEdgeProps);
    		if ('centerY' in $$props) $$invalidate(7, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(8, centerX = $$props.centerX);
    		if ('labelTextColor' in $$props) $$invalidate(9, labelTextColor = $$props.labelTextColor);
    		if ('labelBgColor' in $$props) $$invalidate(10, labelBgColor = $$props.labelBgColor);
    		if ('label' in $$props) $$invalidate(11, label = $$props.label);
    		if ('edgeTextProps' in $$props) $$invalidate(0, edgeTextProps = $$props.edgeTextProps);
    		if ('edgeColor' in $$props) $$invalidate(1, edgeColor = $$props.edgeColor);
    		if ('arrow' in $$props) $$invalidate(2, arrow = $$props.arrow);
    		if ('animate' in $$props) $$invalidate(3, animate = $$props.animate);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*baseEdgeProps*/ 64) {
    			// destructuring the props passed in from the parent component
    			$$invalidate(4, { path, animate, arrow, label, labelBgColor, labelTextColor, edgeColor, centerX, centerY } = baseEdgeProps, path, ($$invalidate(3, animate), $$invalidate(6, baseEdgeProps)), ($$invalidate(2, arrow), $$invalidate(6, baseEdgeProps)), ($$invalidate(11, label), $$invalidate(6, baseEdgeProps)), ($$invalidate(10, labelBgColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(9, labelTextColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(1, edgeColor), $$invalidate(6, baseEdgeProps)), ($$invalidate(8, centerX), $$invalidate(6, baseEdgeProps)), ($$invalidate(7, centerY), $$invalidate(6, baseEdgeProps)));
    		}

    		if ($$self.$$.dirty & /*label, labelBgColor, labelTextColor, centerX, centerY*/ 3968) {
    			// setting edge text props
    			$$invalidate(0, edgeTextProps = {
    				label,
    				labelBgColor,
    				labelTextColor,
    				centerX,
    				centerY
    			});
    		}
    	};

    	return [
    		edgeTextProps,
    		edgeColor,
    		arrow,
    		animate,
    		path,
    		defaultArrow,
    		baseEdgeProps,
    		centerY,
    		centerX,
    		labelTextColor,
    		labelBgColor,
    		label
    	];
    }

    class BaseEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, { baseEdgeProps: 6 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "BaseEdge",
    			options,
    			id: create_fragment$g.name
    		});
    	}

    	get baseEdgeProps() {
    		throw new Error("<BaseEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set baseEdgeProps(value) {
    		throw new Error("<BaseEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // enumerable values (static) set for Position
    var Position;
    (function (Position) {
        Position["Left"] = "left";
        Position["Right"] = "right";
        Position["Top"] = "top";
        Position["Bottom"] = "bottom";
    })(Position || (Position = {}));
    //
    // export type CoordinateExtent = [[number, number], [number, number]];

    /* node_modules/svelvet/Edges/SimpleBezierEdge.svelte generated by Svelte v3.55.1 */

    function create_fragment$f(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function calculateControlOffset(distance, curvature) {
    	if (distance >= 0) {
    		return 0.5 * distance;
    	} else {
    		return curvature * 25 * Math.sqrt(-distance);
    	}
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let params;
    	let path;
    	let centerX;
    	let centerY;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SimpleBezierEdge', slots, []);

    	function getControlWithCurvature({ pos, x1, y1, x2, y2, c }) {
    		let ctX, ctY;

    		switch (pos) {
    			case Position.Left:
    				{
    					ctX = x1 - calculateControlOffset(x1 - x2, c);
    					ctY = y1;
    				}
    				break;
    			case Position.Right:
    				{
    					ctX = x1 + calculateControlOffset(x2 - x1, c);
    					ctY = y1;
    				}
    				break;
    			case Position.Top:
    				{
    					ctX = x1;
    					ctY = y1 - calculateControlOffset(y1 - y2, c);
    				}
    				break;
    			case Position.Bottom:
    				{
    					ctX = x1;
    					ctY = y1 + calculateControlOffset(y2 - y1, c);
    				}
    				break;
    		}

    		return [ctX, ctY];
    	}

    	// returns string to pass into edge 'path' svg d attribute (where to be drawn)
    	// referenced from ReactFlow.dev
    	function getSimpleBezierPath(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25 }
    	) {
    		const [sourceControlX, sourceControlY] = getControlWithCurvature({
    			pos: sourcePosition,
    			x1: sourceX,
    			y1: sourceY,
    			x2: targetX,
    			y2: targetY,
    			c: curvature
    		});

    		const [targetControlX, targetControlY] = getControlWithCurvature({
    			pos: targetPosition,
    			x1: targetX,
    			y1: targetY,
    			x2: sourceX,
    			y2: sourceY,
    			c: curvature
    		});

    		return `M${sourceX},${sourceY} C${sourceControlX},${sourceControlY} ${targetControlX},${targetControlY} ${targetX},${targetY}`;
    	}

    	// determining center of the bezier curve to know where to place the bezier edge text label
    	function getSimpleBezierCenter(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, curvature = 0.25 }
    	) {
    		const [sourceControlX, sourceControlY] = getControlWithCurvature({
    			pos: sourcePosition,
    			x1: sourceX,
    			y1: sourceY,
    			x2: targetX,
    			y2: targetY,
    			c: curvature
    		});

    		const [targetControlX, targetControlY] = getControlWithCurvature({
    			pos: targetPosition,
    			x1: targetX,
    			y1: targetY,
    			x2: sourceX,
    			y2: sourceY,
    			c: curvature
    		});

    		// cubic bezier t=0.5 mid point, not the actual mid point, but easy to calculate
    		// https://stackoverflow.com/questions/67516101/how-to-find-distance-mid-point-of-bezier-curve
    		const centerX = sourceX * 0.125 + sourceControlX * 0.375 + targetControlX * 0.375 + targetX * 0.125;

    		const centerY = sourceY * 0.125 + sourceControlY * 0.375 + targetControlY * 0.375 + targetY * 0.125;
    		const xOffset = Math.abs(centerX - sourceX);
    		const yOffset = Math.abs(centerY - sourceY);
    		return [centerX, centerY, xOffset, yOffset];
    	}

    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<SimpleBezierEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SimpleBezierEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		Position,
    		calculateControlOffset,
    		getControlWithCurvature,
    		getSimpleBezierPath,
    		getSimpleBezierCenter,
    		edge,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		params
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    		if ('centerY' in $$props) $$invalidate(2, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(3, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('params' in $$props) $$invalidate(5, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge*/ 2) {
    			$$invalidate(5, params = {
    				sourceX: edge.sourceX,
    				sourceY: edge.sourceY,
    				sourcePosition: edge.sourcePosition,
    				targetX: edge.targetX,
    				targetY: edge.targetY,
    				targetPosition: edge.targetPosition,
    				curvature: 0.25
    			});
    		}

    		if ($$self.$$.dirty & /*params*/ 32) {
    			// pass in params to function that returns a string value for SVG path d attribute (where to be drawn)
    			$$invalidate(4, path = getSimpleBezierPath(params));
    		}

    		if ($$self.$$.dirty & /*params*/ 32) {
    			$$invalidate(3, [centerX, centerY] = getSimpleBezierCenter(params), centerX, (($$invalidate(2, centerY), $$invalidate(5, params)), $$invalidate(1, edge)));
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 30) {
    			// pass necessary values to BaseEdge component
    			// BaseEdge renders a 'base' path that can be customized by parent Edge components
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [baseEdgeProps, edge, centerY, centerX, path, params];
    }

    class SimpleBezierEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { edge: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SimpleBezierEdge",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get edge() {
    		throw new Error("<SimpleBezierEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<SimpleBezierEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/StraightEdge.svelte generated by Svelte v3.55.1 */

    function create_fragment$e(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let xOffset;
    	let yOffset;
    	let centerX;
    	let centerY;
    	let path;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StraightEdge', slots, []);
    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<StraightEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StraightEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		edge,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		yOffset,
    		xOffset
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(1, edge = $$props.edge);
    		if ('centerY' in $$props) $$invalidate(2, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(3, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(4, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('yOffset' in $$props) $$invalidate(5, yOffset = $$props.yOffset);
    		if ('xOffset' in $$props) $$invalidate(6, xOffset = $$props.xOffset);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge*/ 2) {
    			// offset is determining the difference between X and Y coordinates of the source and target nodes
    			$$invalidate(6, xOffset = Math.abs(edge.targetX - edge.sourceX) / 2);
    		}

    		if ($$self.$$.dirty & /*edge*/ 2) {
    			$$invalidate(5, yOffset = Math.abs(edge.targetY - edge.sourceY) / 2);
    		}

    		if ($$self.$$.dirty & /*edge, xOffset*/ 66) {
    			// determining the center point of the edge to be used in the EdgeText component
    			$$invalidate(3, centerX = edge.targetX < edge.sourceX
    			? edge.targetX + xOffset
    			: edge.targetX - xOffset);
    		}

    		if ($$self.$$.dirty & /*edge, yOffset*/ 34) {
    			$$invalidate(2, centerY = edge.targetY < edge.sourceY
    			? edge.targetY + yOffset
    			: edge.targetY - yOffset);
    		}

    		if ($$self.$$.dirty & /*edge*/ 2) {
    			// determine SVG path d (where to be drawn) string value to pass into BaseEdge component
    			// path is reactive to current edge source/target X and Y values
    			$$invalidate(4, path = `M ${edge.sourceX},${edge.sourceY}L ${edge.targetX},${edge.targetY}`);
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 30) {
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [baseEdgeProps, edge, centerY, centerX, path, yOffset, xOffset];
    }

    class StraightEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, { edge: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StraightEdge",
    			options,
    			id: create_fragment$e.name
    		});
    	}

    	get edge() {
    		throw new Error("<StraightEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<StraightEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    //needed for getCenter funciotn
    const LeftOrRight = [Position.Left, Position.Right];
    //used to determine the position for edge text on a Smooth or Step Edge
    const getCenter = ({ sourceX, sourceY, targetX, targetY, sourcePosition = Position.Bottom, targetPosition = Position.Top }) => {
        const sourceIsLeftOrRight = LeftOrRight.includes(sourcePosition);
        const targetIsLeftOrRight = LeftOrRight.includes(targetPosition);
        // we expect flows to be horizontal or vertical (all handles left or right respectively top or bottom)
        // a mixed edge is when one the source is on the left and the target is on the top for example.
        const mixedEdge = (sourceIsLeftOrRight && !targetIsLeftOrRight) || (targetIsLeftOrRight && !sourceIsLeftOrRight);
        if (mixedEdge) {
            const xOffset = sourceIsLeftOrRight ? Math.abs(targetX - sourceX) : 0;
            const centerX = sourceX > targetX ? sourceX - xOffset : sourceX + xOffset;
            const yOffset = sourceIsLeftOrRight ? 0 : Math.abs(targetY - sourceY);
            const centerY = sourceY < targetY ? sourceY + yOffset : sourceY - yOffset;
            return [centerX, centerY, xOffset, yOffset];
        }
        const xOffset = Math.abs(targetX - sourceX) / 2;
        const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;
        const yOffset = Math.abs(targetY - sourceY) / 2;
        const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;
        return [centerX, centerY, xOffset, yOffset];
    };

    const svelvetStores = {};
    // refer to Svelvet/index, if store does not exist, then create one.

    // Moved this out of the findOrCreateStore function to have it as more of a traditional? state that can be updated more easily
    const coreSvelvetStore = {
        nodesStore: writable([]),
        edgesStore: writable([]),
        widthStore: writable(600),
        heightStore: writable(600),
        backgroundStore: writable(false),
        movementStore: writable(true),
        nodeSelected: writable(false),
        nodeIdSelected: writable(-1),
        d3Scale: writable(1),
        snapgrid: writable(false),
        snapResize: writable(30),
        backgroundColor: writable(),
        hoveredElement: writable(null),
        initZoom: writable(4),
        initLocation: writable({x:0, y:0}),
        isLocked: writable(false),
        boundary: writable(false),
        nodeLinkStore: writable(false),
        nodeCreateStore: writable(false),
        nodeEditStore: writable(false),
        shareable: writable(false),
        deleteNodes: writable(false)
    };


    // Creates one Svelvet component store using the unique key
    function findOrCreateStore(key) {
        //This just returns whatever we are requesting from store.js
        const existing = svelvetStores[key];
        if (existing) {
            return existing;
        }
       
        // This is the function handler for the mouseMove event to update the position of the selected node.
        // Changed from onMouseMove to onNodeMove because of addition of onEdgeMove function
        const onNodeMove = (e, nodeID) => {
          const bound = get_store_value(coreSvelvetStore.boundary);
          //if there is a boundary set, nodes cannot be moved passed the boundary 
          if(bound){
                coreSvelvetStore.nodesStore.update((n) => {
                    const correctNode = n.find((node) => node.id === nodeID);
                    
                    const scale = get_store_value(coreSvelvetStore.d3Scale);
                    //nodes can only move within 50px of the bounds
                    if(correctNode.childNodes){
                        n.forEach((child) => {
                            if(correctNode.childNodes.includes(child.id)){
                              child.position.x = Math.min(Math.max(child.position.x + e.movementX / scale, 1), bound.x-50);
                              child.position.y = Math.min(Math.max(child.position.y +e.movementY / scale, 1), bound.y-50);
                            }
                        });
                        correctNode.position.x = Math.min(Math.max(correctNode.position.x + e.movementX / scale, 1), bound.x-50);
                        correctNode.position.y = Math.min(Math.max(correctNode.position.y +e.movementY / scale, 1), bound.y-50);
                    }
                    else {
                        // divide the movement value by scale to keep it proportional to d3Zoom transformations
                        correctNode.position.x = Math.min(Math.max(correctNode.position.x + e.movementX / scale, 1), bound.x-50);
                        correctNode.position.y = Math.min(Math.max(correctNode.position.y +e.movementY / scale, 1), bound.y-50);
        
                    }
                    return [...n];
                });}
                  else {
                  coreSvelvetStore.nodesStore.update((n) => {
                    const correctNode = n.find((node) => node.id === nodeID);
        
                    const scale = get_store_value(coreSvelvetStore.d3Scale);
        
                    if(correctNode.childNodes){
                        n.forEach((child) => {
                            if(correctNode.childNodes.includes(child.id)){
                                child.position.x += e.movementX / scale;
                                child.position.y += e.movementY / scale;
                            }
                        });
                        correctNode.position.x += e.movementX / scale;
                        correctNode.position.y += e.movementY / scale;
                    }
                    else {
                        // divide the movement value by scale to keep it proportional to d3Zoom transformations
                        correctNode.position.x += e.movementX / scale;
                        correctNode.position.y += e.movementY / scale;
        
                    }
                    return [...n];
                });
            }      };
                

        // Mostly copied from onNodeMove, this allows for the movement of new Edges that don't yet have targets/sources
        const onEdgeMove = (event, edgeID) => {
            coreSvelvetStore.edgesStore.update((e) => {
                const correctEdge = e.find((edge) => edge.id === edgeID);
                const scale = get_store_value(coreSvelvetStore.d3Scale);
                // divide the movement value by scale to keep it proportional to d3Zoom transformations
                if (!correctEdge.target) {
                  correctEdge.targetX += event.movementX / scale;
                  correctEdge.targetY += event.movementY / scale;
                } 
                if (!correctEdge.source) {
                  correctEdge.sourceX += event.movementX / scale;
                  correctEdge.sourceY += event.movementY / scale;
                }
                return [...e];
            });
        };

        // This is the function handler for the touch event on mobile to select a node.
        const onTouchMove = (e, nodeID) => {
                coreSvelvetStore.nodesStore.update((n) => {
                    // restores mobile functionality
                    n.forEach(node => {
                        if (node.id === nodeID) {
                          //calculates the location of the selected node
                          const { x, y, width, height } = e.target.getBoundingClientRect();
                          const offsetX = ((e.touches[0].clientX - x) / width) * e.target.offsetWidth;
                          const offsetY = ((e.touches[0].clientY - y) / height) * e.target.offsetHeight;
                          // centers the node consistently under the user's touch
                          node.position.x += offsetX - node.width / 2;
                          node.position.y += offsetY - node.height / 2;
                        }
                      });
                      return [...n];
                    });

                /*  
                    Svelvet 4.0 dev code see:
                    https://github.com/open-source-labs/Svelvet/blob/main/NPM%20Package/svelvet/Future%20Iteration/ParentNode.md
                    const correctNode = n.find((node) => node.id === nodeID);
                    const { x, y, width, height } = e.target.getBoundingClientRect();
                    const offsetX = ((e.touches[0].clientX - x) / width) * e.target.offsetWidth;
                    const offsetY = ((e.touches[0].clientY - y) / height) * e.target.offsetHeight;
        
                    if(correctNode.childNodes){
                        n.forEach((child)=>{
                            //conditional fails, make it recognize the nodes in childNodes
                            if(correctNode.childNodes.includes(child.id)){
                                //All nodes within child nodes will move with the parent container node.
                                child.position.x += offsetX - correctNode.width/2;
                                child.position.y += offsetY - correctNode.height/2;
                            }
                        })
                        correctNode.position.x += offsetX - correctNode.width/2;
                        correctNode.position.y += offsetY - correctNode.height/2;
                    }  else {
                        // centers the node consistently under the user's touch
                        correctNode.position.x += offsetX - correctNode.width/2;
                        correctNode.position.y += offsetY - correctNode.height/2;
        
                    }
                });
                return [...n];
                */
        };
        const deleteNode = (e, $nodeIdSelected) => {
          const answer = confirm('Are you sure you want to delete this node?');
          //if confirm yes, access the nodes store in the svelvet store and return a filtered node array accounting for all nodes except the selected node
          if (answer) { 
            coreSvelvetStore.nodesStore.update((n) => {
                return n.filter(node => node.id !== $nodeIdSelected);
            });
          //if confirm yes, also remove all edges connected to selected node
          //access the edges store and return a filtered edges array without all edges connected to selected node
          coreSvelvetStore.edgesStore.update((e) => {
            return e.filter(edge => edge.source !== $nodeIdSelected && edge.target !== $nodeIdSelected)
          });
        }
      };
      /*
      This is the function that renders a new edge when an anchor is clicked
      */  
      const renderEdge = (e, node, role, position) => {
        e.preventDefault(); // preventing default behavior, not sure if necessary
        
        
        const uniq = (Math.random() + 1).toString(36).substring(7) + '-' + (Math.random() + 1).toString(36).substring(7);
        //grabs x y coordinates from setNewEdgeProps
        const [x, y] = setNewEdgeProps(role, position, node);
        // Setting the newEdge variable to an edge prototype
        const newEdge = role === 'source' ? { 
          id: uniq, // generate unique id
          source: node.id, // the source is the node that the anchor is on
          target: null, // until the mouse is released the target will be set to null
          targetX: x,
          targetY: y,
          animate: true,
        } : { 
          id: uniq, // generate unique id
          source: null, // until the mouse is released the source will be set to null
          target: node.id, // the target is the node that the anchor is on
          sourceX: x,
          sourceY: y,
          animate: true, 
        };
        coreSvelvetStore.edgesStore.set([...get_store_value(derivedEdges), newEdge]); // updating the edges in the store
        return newEdge;
      };

      
        /*
      This is the function that renders a new node when the mouse is released
      after clicking on an anchor, takes in the newEdge that was just created
      */  
      const renderNewNode = (event, node, edge, role, position) => {
        // Find the highest of the current id numbers
        const nodeIds = get_store_value(coreSvelvetStore.nodesStore).map(n => n.id);
        const highestId = Math.max(...nodeIds);
        
        event.preventDefault();
        let pos = position === 'bottom' ? { x: edge.targetX, y: edge.targetY } : { x: edge.sourceX, y: edge.sourceY };
        
        // setting newNode variable to a 'prototype' node
        const newNode = {
          id: highestId + 1, // set the id to one higher than the highest in the current array
          position: pos, // the position (top left corner) is at the target coords of the edge for now
          data: node.data ? {...node.data} : {label: ''}, // need ways to change the rest of the properties
          width: node.width,
          height: node.height,
          className: node.className || '',
          bgColor: node.bgColor,
          // image: node.image,
          // src: node.src,
          textColor: node.textColor,
          borderRadius: node.borderRadius,
          borderColor: node.borderColor,
          delete: node.delete
        };
        if (position === 'left') {
          if (role === 'source') {
            newNode.sourcePosition = 'left';
            newNode.targetPosition = 'right';
            edge.target = newNode.id; // set the new edge to target the new node
            newNode.position.x = edge.targetX - newNode.width / 2; // moves the node over to the correct position
            newNode.position.y = edge.targetY;
          }
          else {
            newNode.sourcePosition = 'right';
            newNode.targetPosition = 'left';
            edge.source = newNode.id;
            newNode.position.x = edge.sourceX - newNode.width / 2;
            newNode.position.y = edge.sourceY - newNode.height;
          }
        } else if (position === 'right') {
          if(role === 'source') {
            newNode.sourcePosition = 'right';
            newNode.targetPosition = 'left';
            edge.target = newNode.id; // set the new edge to target the new node
            newNode.position.x = edge.targetX - newNode.width / 2; // moves the node over to the correct position
            newNode.position.y = edge.targetY;
          }
          else {
            newNode.sourcePosition = 'left';
            newNode.targetPosition = 'right';
            edge.source = newNode.id;
            newNode.position.x = edge.sourceX - newNode.width / 2;
            newNode.position.y = edge.sourceY - newNode.height;
          }
        } else {
          if(role === 'source') {
            edge.target = newNode.id; // set the new edge to target the new node
            newNode.position.x = edge.targetX - newNode.width / 2; // moves the node over to the correct position
            newNode.position.y = edge.targetY;
          }
          else {
            edge.source = newNode.id;
            newNode.position.x = edge.sourceX - newNode.width / 2;
            newNode.position.y = edge.sourceY - newNode.height;
          }
        }
        coreSvelvetStore.nodesStore.set([...get_store_value(nodesStore), newNode]); // update the nodes in the store
      };

        // Getting the styles for a custom class, and adjusting the height and width if necessary
        const getStyles = (e, node) => {
            let width, height, innerText;
            
            const styleRules = document.styleSheets[1].cssRules; // getting the right stylesheet and cssRules from the CSS object model
            
            // Look through each CSS rule to find the one the user defined
            Object.values(styleRules).forEach(rule => {
              if (rule.selectorText === `.${node.className}`) {
                const initialText = rule.cssText; // getting the full text of the CSS rule 
                const i = initialText.indexOf('{'); // finding index of first bracket
                innerText = initialText.substring(i + 1, initialText.length - 1); // extracting the CSS to insert into inline style
            
                // Adjusting the width and height if they are set via the custom class
                const arr = innerText.split(' ');
                arr.forEach((str, i) => {
                  if (str === 'width:') {
                    width = str.concat(arr[i+1]); // go through the array and join width and the number
                    const w = parseInt(arr[i+1]); // getting the number for the width
                    width = w;
                  }
                  if (str === 'height:') {
                    height = str.concat(arr[i+1]); // same as with the width
                    const h = parseInt(arr[i+1]);
                    height = h;
                  }
                });
              }
            });
            // adjusting the properties on the node in the store 
            const newStore = get_store_value(coreSvelvetStore.nodesStore).map(n => {
              if (node.id === n.id) {
                n.width = width || node.width;
                n.height = height || node.height;
                return n;
              } else return n;
            });
            coreSvelvetStore.nodesStore.set(newStore);
            return [width, height, innerText];
          };


        const nodeIdSelected = coreSvelvetStore.nodeIdSelected;
        // if the user clicks a node without moving it, this function fires allowing a user to invoke the callback function
        const onNodeClick = (e, nodeID) => {
            get_store_value(nodesStore).forEach((node) => {
                if (node.id === get_store_value(nodeIdSelected)) {
                    node.clickCallback?.(node);
                }
            });
        };

        const edgesStore = coreSvelvetStore.edgesStore;
        const nodesStore = coreSvelvetStore.nodesStore;
        // derive from nodesStore and edgesStore, pass in array value from each store
        // updates edgesStore with new object properties (edge.sourceX, edge.targetY, etc) for edgesArray
        // $nodesStore and its individual object properties are reactive to node.position.x and node.position.y
        // so derivedEdges has access to node.position.x and node.position.y changes inside of this function
        const derivedEdges = derived([nodesStore, edgesStore], ([$nodesStore, $edgesStore]) => {
            $edgesStore.forEach((edge) => {
                // any -> edge should follow type DerivedEdge, but we are assigning to any so the typing meshes together
                // These are dummy nodes to resolve a typescripting issue. They are overwritten in the following forEach loop
                let sourceNode = {
                    id: 0,
                    position: { x: 25, y: 475 },
                    data: { label: '9' },
                    width: 175,
                    height: 40,
                    targetPosition: 'right',
                    sourcePosition: 'left'
                };
                let targetNode = {
                    id: 10,
                    position: { x: 750, y: 475 },
                    data: { label: '10' },
                    width: 175,
                    height: 40,
                    targetPosition: 'right',
                    sourcePosition: 'left'
                };
                
                //We find out what the sourceNode is or the targetNode is.
                $nodesStore.forEach((node) => {
                    if (edge.source === node.id) {
                        sourceNode = node;
                    }
                    if (edge.target === node.id) {
                        targetNode = node;
                    } 
                });

                // If the edge doesn't have a target yet, set the target to null rather than to the dummy node above
                if(!$nodesStore.some(node => node.id === edge.target)) targetNode = null;
                // Do the same for the source 
                if(!$nodesStore.some(node => node.id === edge.source)) sourceNode = null;

                if (sourceNode) {
                    
                    //left side of the node selected
                    let left = sourceNode.position.x;
                    
                    //top of the node selected
                    let top = sourceNode.position.y;
                    
                    //declaring the middle point of the node
                    let middle = sourceNode.width / 2;
                    
                    //Default sourcePosition to bottom if sourcePosition not defined
                    if (sourceNode.sourcePosition === 'bottom' || sourceNode.sourcePosition === undefined) {
                    
                        //the x coordinate of the middle of the node
                        edge.sourceX = left + middle;
                        
                        //the y coordinate of the bottom of the node
                        edge.sourceY = top + sourceNode.height;
                        
                        //assign sourcePosition to the edge for usage in the various edge components
                        edge.sourcePosition = 'bottom';
                    }
                    else if (sourceNode.sourcePosition === 'top') {
                        edge.sourceX = left + middle;
                        edge.sourceY = top;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                    else if (sourceNode.sourcePosition === 'left') {
                        edge.sourceX = left;
                        edge.sourceY = top + sourceNode.height / 2;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                    else if (sourceNode.sourcePosition === 'right') {
                        edge.sourceX = left + sourceNode.width;
                        edge.sourceY = top + sourceNode.height / 2;
                        edge.sourcePosition = sourceNode.sourcePosition;
                    }
                }
                if (targetNode) {
                    
                    //left side of the node selected
                    let left = targetNode.position.x;
                    
                    //top of the node selected
                    let top = targetNode.position.y;
                    
                    //declaring the middle point of the node
                    let middle = targetNode.width / 2;

                    //Default to top targetPosition if targetPosition undefined
                    if (targetNode.targetPosition === 'top' || targetNode.targetPosition === undefined) {
                        //the x coordinate of the middle of the node
                        edge.targetX = left + middle;
                        //the y coordinate of the top of the node
                        edge.targetY = top;
                        //assign sourcePosition to the edge for usage in the various edge components
                        edge.targetPosition = 'top';
                    }
                    else if (targetNode.targetPosition === 'bottom') {
                        edge.targetX = left + middle;
                        edge.targetY = top + targetNode.height;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                    else if (targetNode.targetPosition === 'left') {
                        edge.targetX = left;
                        edge.targetY = top + targetNode.height / 2;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                    else if (targetNode.targetPosition === 'right') {
                        edge.targetX = left + targetNode.width;
                        edge.targetY = top + targetNode.height / 2;
                        edge.targetPosition = targetNode.targetPosition;
                    }
                } 
            });
            return [...$edgesStore];
        });

        // Sets the position of each anchor (top, bottom, left or right)
        const setAnchorPosition = (position, nodeWidth, nodeHeight, width, height) => {
            let top;
            let left;
            if(position === 'top') {
              top = -height / 2;
              left = nodeWidth / 2 - width / 2;
            }
            if(position === 'bottom') {
              top = nodeHeight - height / 2;
              left = nodeWidth / 2 - width / 2;
            }
            if(position === 'left') {
              top = nodeHeight / 2 - height / 2;
              left = -width / 2;
            }
            if(position === 'right') {
              top = nodeHeight / 2 - height / 2;
              left = nodeWidth - width / 2;
            }
            return [top, left];
          };

          const setNewEdgeProps = (role, position, node) => {
            let left = node.position.x;
            //top of the node selected
            let top = node.position.y;
            //declaring the middle point of the node
            let middle = node.width / 2;
            let x;
            let y;
            if(role === 'source') {
                if (position === 'top') {
                    //the x coordinate of the middle of the node
                    x = left + middle;
                    //the y coordinate of the top of the node
                    y = top;
                }
                else if (position === 'bottom') {
                    x = left + middle;
                    y = top + node.height;
                }
                else if (position === 'left') {
                    x = left;
                    y = top + node.height / 2;
                }
                else if (position === 'right') {
                    x = left + node.width;
                    y = top + node.height / 2;
                }
                return [x, y];
            } else {
                if (position === 'top') {
                    //the x coordinate of the middle of the node
                    x = left + middle;
                    //the y coordinate of the top of the node
                    y = top;
                }
                else if (position === 'bottom') {
                    x = left + middle;
                    y = top + node.height;
                }
                else if (position === 'left') {
                    x = left;
                    y = top + node.height / 2;
                }
                else if (position === 'right') {
                    x = left + node.width;
                    y = top + node.height / 2;
                }
                return [x, y];
            }
        }; 

        
        //Puts everything together as the svelvet store and use the key so that it can be used.
        const svelvetStore = {
            ...coreSvelvetStore,
            onTouchMove,
            onEdgeMove,
            onNodeMove,
            onNodeClick,
            setAnchorPosition,
            setNewEdgeProps,
            renderEdge,
            renderNewNode,
            getStyles,
            deleteNode,
            derivedEdges
        };
        svelvetStores[key] = svelvetStore;
        return svelvetStore;
    }

    /* node_modules/svelvet/Edges/EdgeAnchor.svelte generated by Svelte v3.55.1 */
    const file$b = "node_modules/svelvet/Edges/EdgeAnchor.svelte";

    // (116:0) {:else}
    function create_else_block$2(ctx) {
    	let div;
    	let div_style_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "Anchor-inert svelte-u3wgq7");

    			attr_dev(div, "style", div_style_value = `
    height:${/*anchorHeight*/ ctx[16]}px;
    width:${/*anchorWidth*/ ctx[15]}px;
    top: ${/*top*/ ctx[5]}px;
    left:${/*left*/ ctx[6]}px;
  `);

    			add_location(div, file$b, 116, 0, 3633);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*top, left*/ 96 && div_style_value !== (div_style_value = `
    height:${/*anchorHeight*/ ctx[16]}px;
    width:${/*anchorWidth*/ ctx[15]}px;
    top: ${/*top*/ ctx[5]}px;
    left:${/*left*/ ctx[6]}px;
  `)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(116:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (79:0) {#if $nodeLinkStore}
    function create_if_block$4(ctx) {
    	let div;
    	let div_style_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", "Anchor svelte-u3wgq7");

    			attr_dev(div, "style", div_style_value = `
      height:${/*anchorHeight*/ ctx[16]}px;
      width:${/*anchorWidth*/ ctx[15]}px;
      top: ${/*top*/ ctx[5]}px;
      left:${/*left*/ ctx[6]}px;
    `);

    			add_location(div, file$b, 80, 2, 2597);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mousedown", /*mousedown_handler*/ ctx[29], false, false, false),
    					listen_dev(div, "mouseup", /*mouseup_handler_1*/ ctx[30], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler*/ ctx[31], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[32], false, false, false),
    					listen_dev(div, "keydown", keydown_handler$5, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*top, left*/ 96 && div_style_value !== (div_style_value = `
      height:${/*anchorHeight*/ ctx[16]}px;
      width:${/*anchorWidth*/ ctx[15]}px;
      top: ${/*top*/ ctx[5]}px;
      left:${/*left*/ ctx[6]}px;
    `)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(79:0) {#if $nodeLinkStore}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$d(ctx) {
    	let if_block_anchor;
    	let mounted;
    	let dispose;

    	function select_block_type(ctx, dirty) {
    		if (/*$nodeLinkStore*/ ctx[14]) return create_if_block$4;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty$1();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*mousemove_handler*/ ctx[27], false, false, false),
    					listen_dev(window, "mouseup", /*mouseup_handler*/ ctx[28], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$5 = () => {
    	return;
    };

    function instance$d($$self, $$props, $$invalidate) {
    	let store;
    	let $hoveredElement;
    	let $nodeCreateStore;
    	let $derivedEdges;
    	let $nodeLinkStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EdgeAnchor', slots, []);
    	let { key } = $$props;
    	let { node } = $$props;
    	let { position } = $$props;
    	let { role } = $$props;
    	let { width } = $$props;
    	let { height } = $$props;
    	let newEdge;
    	let hovered = false;
    	let anchorWidth = 13;
    	let anchorHeight = 13;
    	let top;
    	let left;
    	const { onEdgeMove, setAnchorPosition, renderEdge, renderNewNode, hoveredElement, derivedEdges, nodeLinkStore, nodeCreateStore } = findOrCreateStore(key);
    	validate_store(hoveredElement, 'hoveredElement');
    	component_subscribe($$self, hoveredElement, value => $$invalidate(11, $hoveredElement = value));
    	validate_store(derivedEdges, 'derivedEdges');
    	component_subscribe($$self, derivedEdges, value => $$invalidate(13, $derivedEdges = value));
    	validate_store(nodeLinkStore, 'nodeLinkStore');
    	component_subscribe($$self, nodeLinkStore, value => $$invalidate(14, $nodeLinkStore = value));
    	validate_store(nodeCreateStore, 'nodeCreateStore');
    	component_subscribe($$self, nodeCreateStore, value => $$invalidate(12, $nodeCreateStore = value));

    	// $: shouldMove = moving && $movementStore;
    	// $nodeSelected is a store boolean that lets GraphView component know if ANY node is selected
    	// moving local boolean specific to node selected, to change position of individual node once selected
    	let moving = false;

    	let moved = false;
    	let edgeShouldMove = false;

    	// Before the component is updated, adjust the top and left positions to account for custom class dimensions
    	beforeUpdate(() => {
    		$$invalidate(5, top = setAnchorPosition(position, width, height, anchorWidth, anchorHeight)[0]);
    		$$invalidate(6, left = setAnchorPosition(position, width, height, anchorWidth, anchorHeight)[1]);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'key'");
    		}

    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'node'");
    		}

    		if (position === undefined && !('position' in $$props || $$self.$$.bound[$$self.$$.props['position']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'position'");
    		}

    		if (role === undefined && !('role' in $$props || $$self.$$.bound[$$self.$$.props['role']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'role'");
    		}

    		if (width === undefined && !('width' in $$props || $$self.$$.bound[$$self.$$.props['width']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'width'");
    		}

    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<EdgeAnchor> was created without expected prop 'height'");
    		}
    	});

    	const writable_props = ['key', 'node', 'position', 'role', 'width', 'height'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EdgeAnchor> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = e => {
    		e.preventDefault();

    		if (newEdge && edgeShouldMove) {
    			onEdgeMove(e, newEdge.id); // re-renders (moves) the edge while the mouse is down and moving
    			$$invalidate(8, moved = true);
    		}
    	};

    	const mouseup_handler = e => {
    		$$invalidate(9, edgeShouldMove = false); // prevent the new edge from moving

    		if (newEdge && moved) {
    			$$invalidate(3, newEdge.animate = false, newEdge);

    			if ($hoveredElement && $hoveredElement.id !== node.id) {
    				if (role === 'target') $$invalidate(3, newEdge.source = $hoveredElement.id, newEdge); else $$invalidate(3, newEdge.target = $hoveredElement.id, newEdge);
    				($$invalidate(10, store), $$invalidate(24, key));
    			} else if ($nodeCreateStore && !$hoveredElement) {
    				renderNewNode(e, node, newEdge, role, position); // store.edgesStore.set([...$derivedEdges, newEdge]);
    			} else {
    				//if no anchor is found (no place to connect new edge), update edges store filtering out newly constructed edge
    				store.edgesStore.set($derivedEdges.filter(e => e.id !== newEdge.id));
    			}
    		}

    		$$invalidate(3, newEdge = null); // reset newEdge so that the next one can be created normally
    		$$invalidate(8, moved = false);
    		$$invalidate(7, moving = false);
    	};

    	const mousedown_handler = e => {
    		e.preventDefault();
    		e.stopPropagation(); // Important! Prevents the event from firing on the parent element (the .Nodes div) 
    		$$invalidate(9, edgeShouldMove = true);
    	};

    	const mouseup_handler_1 = e => {
    		e.preventDefault();
    		$$invalidate(9, edgeShouldMove = false);
    		$$invalidate(7, moving = false);
    	};

    	const mouseenter_handler = e => {
    		$$invalidate(4, hovered = true);
    		store.hoveredElement.set(node); // If the mouse enters an anchor, we store the node it's attached to for reference
    	};

    	const mouseleave_handler = e => {
    		if (edgeShouldMove && !newEdge) $$invalidate(3, newEdge = renderEdge(e, node, role, position)); // renders the new edge on the screen
    		store.edgesStore.set($derivedEdges);
    		$$invalidate(4, hovered = false);
    		store.hoveredElement.set(null); // When the mouse leaves an anchor, we clear the value in the store
    	};

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(24, key = $$props.key);
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('position' in $$props) $$invalidate(1, position = $$props.position);
    		if ('role' in $$props) $$invalidate(2, role = $$props.role);
    		if ('width' in $$props) $$invalidate(25, width = $$props.width);
    		if ('height' in $$props) $$invalidate(26, height = $$props.height);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		beforeUpdate,
    		afterUpdate,
    		key,
    		node,
    		position,
    		role,
    		width,
    		height,
    		newEdge,
    		hovered,
    		anchorWidth,
    		anchorHeight,
    		top,
    		left,
    		onEdgeMove,
    		setAnchorPosition,
    		renderEdge,
    		renderNewNode,
    		hoveredElement,
    		derivedEdges,
    		nodeLinkStore,
    		nodeCreateStore,
    		moving,
    		moved,
    		edgeShouldMove,
    		store,
    		$hoveredElement,
    		$nodeCreateStore,
    		$derivedEdges,
    		$nodeLinkStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(24, key = $$props.key);
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('position' in $$props) $$invalidate(1, position = $$props.position);
    		if ('role' in $$props) $$invalidate(2, role = $$props.role);
    		if ('width' in $$props) $$invalidate(25, width = $$props.width);
    		if ('height' in $$props) $$invalidate(26, height = $$props.height);
    		if ('newEdge' in $$props) $$invalidate(3, newEdge = $$props.newEdge);
    		if ('hovered' in $$props) $$invalidate(4, hovered = $$props.hovered);
    		if ('anchorWidth' in $$props) $$invalidate(15, anchorWidth = $$props.anchorWidth);
    		if ('anchorHeight' in $$props) $$invalidate(16, anchorHeight = $$props.anchorHeight);
    		if ('top' in $$props) $$invalidate(5, top = $$props.top);
    		if ('left' in $$props) $$invalidate(6, left = $$props.left);
    		if ('moving' in $$props) $$invalidate(7, moving = $$props.moving);
    		if ('moved' in $$props) $$invalidate(8, moved = $$props.moved);
    		if ('edgeShouldMove' in $$props) $$invalidate(9, edgeShouldMove = $$props.edgeShouldMove);
    		if ('store' in $$props) $$invalidate(10, store = $$props.store);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*key*/ 16777216) {
    			$$invalidate(10, store = findOrCreateStore(key));
    		}
    	};

    	return [
    		node,
    		position,
    		role,
    		newEdge,
    		hovered,
    		top,
    		left,
    		moving,
    		moved,
    		edgeShouldMove,
    		store,
    		$hoveredElement,
    		$nodeCreateStore,
    		$derivedEdges,
    		$nodeLinkStore,
    		anchorWidth,
    		anchorHeight,
    		onEdgeMove,
    		renderEdge,
    		renderNewNode,
    		hoveredElement,
    		derivedEdges,
    		nodeLinkStore,
    		nodeCreateStore,
    		key,
    		width,
    		height,
    		mousemove_handler,
    		mouseup_handler,
    		mousedown_handler,
    		mouseup_handler_1,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class EdgeAnchor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$d,
    			create_fragment$d,
    			safe_not_equal,
    			{
    				key: 24,
    				node: 0,
    				position: 1,
    				role: 2,
    				width: 25,
    				height: 26
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EdgeAnchor",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get key() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get node() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get role() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set role(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<EdgeAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<EdgeAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/SmoothStepEdge.svelte generated by Svelte v3.55.1 */

    function create_fragment$c(ctx) {
    	let baseedge;
    	let current;

    	baseedge = new BaseEdge({
    			props: { baseEdgeProps: /*baseEdgeProps*/ ctx[0] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(baseedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(baseedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const baseedge_changes = {};
    			if (dirty & /*baseEdgeProps*/ 1) baseedge_changes.baseEdgeProps = /*baseEdgeProps*/ ctx[0];
    			baseedge.$set(baseedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(baseedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(baseedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(baseedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let params;
    	let centerX;
    	let centerY;
    	let path;
    	let baseEdgeProps;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('SmoothStepEdge', slots, []);
    	const bottomLeftCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x + size},${y}`;
    	const leftBottomCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y - size}`;
    	const bottomRightCorner = (x, y, size) => `L ${x},${y - size}Q ${x},${y} ${x - size},${y}`;
    	const rightBottomCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y - size}`;
    	const leftTopCorner = (x, y, size) => `L ${x + size},${y}Q ${x},${y} ${x},${y + size}`;
    	const topLeftCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x + size},${y}`;
    	const topRightCorner = (x, y, size) => `L ${x},${y + size}Q ${x},${y} ${x - size},${y}`;
    	const rightTopCorner = (x, y, size) => `L ${x - size},${y}Q ${x},${y} ${x},${y + size}`;

    	function getSmoothStepPath(
    		{ sourceX, sourceY, sourcePosition = Position.Bottom, targetX, targetY, targetPosition = Position.Top, borderRadius = 5, centerX, centerY }
    	) {
    		const [_centerX, _centerY, offsetX, offsetY] = getCenter({ sourceX, sourceY, targetX, targetY });
    		const cornerWidth = Math.min(borderRadius, Math.abs(targetX - sourceX));
    		const cornerHeight = Math.min(borderRadius, Math.abs(targetY - sourceY));
    		const cornerSize = Math.min(cornerWidth, cornerHeight, offsetX, offsetY);
    		const leftAndRight = [Position.Left, Position.Right];
    		const cX = typeof centerX !== 'undefined' ? centerX : _centerX;
    		const cY = typeof centerY !== 'undefined' ? centerY : _centerY;
    		let firstCornerPath = null;
    		let secondCornerPath = null;

    		// for non-mixed edge top/bottom
    		if (sourceX <= targetX) {
    			firstCornerPath = sourceY <= targetY
    			? bottomLeftCorner(sourceX, cY, cornerSize)
    			: topLeftCorner(sourceX, cY, cornerSize);

    			secondCornerPath = sourceY <= targetY
    			? rightTopCorner(targetX, cY, cornerSize)
    			: rightBottomCorner(targetX, cY, cornerSize);
    		} else {
    			firstCornerPath = sourceY < targetY
    			? bottomRightCorner(sourceX, cY, cornerSize)
    			: topRightCorner(sourceX, cY, cornerSize);

    			secondCornerPath = sourceY < targetY
    			? leftTopCorner(targetX, cY, cornerSize)
    			: leftBottomCorner(targetX, cY, cornerSize);
    		}

    		// for non-mixed edge left/right
    		if (leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? rightTopCorner(cX, sourceY, cornerSize)
    				: rightBottomCorner(cX, sourceY, cornerSize);

    				secondCornerPath = sourceY <= targetY
    				? bottomLeftCorner(cX, targetY, cornerSize)
    				: topLeftCorner(cX, targetY, cornerSize);
    			} else if (sourcePosition === Position.Right && targetPosition === Position.Left || sourcePosition === Position.Left && targetPosition === Position.Right || sourcePosition === Position.Left && targetPosition === Position.Left) {
    				// and sourceX > targetX
    				firstCornerPath = sourceY <= targetY
    				? leftTopCorner(cX, sourceY, cornerSize)
    				: leftBottomCorner(cX, sourceY, cornerSize);

    				secondCornerPath = sourceY <= targetY
    				? bottomRightCorner(cX, targetY, cornerSize)
    				: topRightCorner(cX, targetY, cornerSize);
    			}
    		} else if (leftAndRight.includes(sourcePosition) && !leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? rightTopCorner(targetX, sourceY, cornerSize)
    				: rightBottomCorner(targetX, sourceY, cornerSize); // for mixed edges (top/bottom to left/right) OR (left/right to top/bottom)
    			} else {
    				firstCornerPath = sourceY <= targetY
    				? leftTopCorner(targetX, sourceY, cornerSize)
    				: leftBottomCorner(targetX, sourceY, cornerSize);
    			}

    			secondCornerPath = '';
    		} else if (!leftAndRight.includes(sourcePosition) && leftAndRight.includes(targetPosition)) {
    			if (sourceX <= targetX) {
    				firstCornerPath = sourceY <= targetY
    				? bottomLeftCorner(sourceX, targetY, cornerSize)
    				: topLeftCorner(sourceX, targetY, cornerSize);
    			} else {
    				firstCornerPath = sourceY <= targetY
    				? bottomRightCorner(sourceX, targetY, cornerSize)
    				: topRightCorner(sourceX, targetY, cornerSize);
    			}

    			secondCornerPath = '';
    		}

    		return `M ${sourceX},${sourceY}${firstCornerPath}${secondCornerPath}L ${targetX},${targetY}`;
    	}

    	let { edge } = $$props;
    	let { borderRadius = 5 } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<SmoothStepEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge', 'borderRadius'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SmoothStepEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(2, edge = $$props.edge);
    		if ('borderRadius' in $$props) $$invalidate(3, borderRadius = $$props.borderRadius);
    	};

    	$$self.$capture_state = () => ({
    		BaseEdge,
    		getCenter,
    		Position,
    		EdgeAnchor,
    		bottomLeftCorner,
    		leftBottomCorner,
    		bottomRightCorner,
    		rightBottomCorner,
    		leftTopCorner,
    		topLeftCorner,
    		topRightCorner,
    		rightTopCorner,
    		getSmoothStepPath,
    		edge,
    		borderRadius,
    		centerY,
    		centerX,
    		path,
    		baseEdgeProps,
    		params
    	});

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(2, edge = $$props.edge);
    		if ('borderRadius' in $$props) $$invalidate(3, borderRadius = $$props.borderRadius);
    		if ('centerY' in $$props) $$invalidate(4, centerY = $$props.centerY);
    		if ('centerX' in $$props) $$invalidate(5, centerX = $$props.centerX);
    		if ('path' in $$props) $$invalidate(6, path = $$props.path);
    		if ('baseEdgeProps' in $$props) $$invalidate(0, baseEdgeProps = $$props.baseEdgeProps);
    		if ('params' in $$props) $$invalidate(7, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*edge, borderRadius*/ 12) {
    			$$invalidate(7, params = {
    				sourceX: edge.sourceX,
    				sourceY: edge.sourceY,
    				targetX: edge.targetX,
    				targetY: edge.targetY,
    				sourcePosition: edge.sourcePosition,
    				targetPosition: edge.targetPosition,
    				borderRadius
    			});
    		}

    		if ($$self.$$.dirty & /*params*/ 128) {
    			$$invalidate(5, [centerX, centerY] = getCenter(params), centerX, ((($$invalidate(4, centerY), $$invalidate(7, params)), $$invalidate(2, edge)), $$invalidate(3, borderRadius)));
    		}

    		if ($$self.$$.dirty & /*params*/ 128) {
    			$$invalidate(6, path = getSmoothStepPath(params));
    		}

    		if ($$self.$$.dirty & /*edge, path, centerX, centerY*/ 116) {
    			$$invalidate(0, baseEdgeProps = { ...edge, path, centerX, centerY });
    		}
    	};

    	return [
    		baseEdgeProps,
    		getSmoothStepPath,
    		edge,
    		borderRadius,
    		centerY,
    		centerX,
    		path,
    		params
    	];
    }

    class SmoothStepEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, {
    			getSmoothStepPath: 1,
    			edge: 2,
    			borderRadius: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "SmoothStepEdge",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get getSmoothStepPath() {
    		return this.$$.ctx[1];
    	}

    	set getSmoothStepPath(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get edge() {
    		throw new Error("<SmoothStepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get borderRadius() {
    		throw new Error("<SmoothStepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set borderRadius(value) {
    		throw new Error("<SmoothStepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/StepEdge.svelte generated by Svelte v3.55.1 */

    function create_fragment$b(ctx) {
    	let smoothstepedge;
    	let current;

    	smoothstepedge = new SmoothStepEdge({
    			props: { edge: /*edge*/ ctx[0], borderRadius: 0 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smoothstepedge.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(smoothstepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const smoothstepedge_changes = {};
    			if (dirty & /*edge*/ 1) smoothstepedge_changes.edge = /*edge*/ ctx[0];
    			smoothstepedge.$set(smoothstepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smoothstepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smoothstepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smoothstepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StepEdge', slots, []);
    	let { edge } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (edge === undefined && !('edge' in $$props || $$self.$$.bound[$$self.$$.props['edge']])) {
    			console.warn("<StepEdge> was created without expected prop 'edge'");
    		}
    	});

    	const writable_props = ['edge'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StepEdge> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('edge' in $$props) $$invalidate(0, edge = $$props.edge);
    	};

    	$$self.$capture_state = () => ({ SmoothStepEdge, edge });

    	$$self.$inject_state = $$props => {
    		if ('edge' in $$props) $$invalidate(0, edge = $$props.edge);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [edge];
    }

    class StepEdge extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { edge: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StepEdge",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get edge() {
    		throw new Error("<StepEdge>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edge(value) {
    		throw new Error("<StepEdge>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Nodes/EditModal.svelte generated by Svelte v3.55.1 */
    const file$a = "node_modules/svelvet/Nodes/EditModal.svelte";

    // (52:2) {#if currentNode}
    function create_if_block$3(ctx) {
    	let form;
    	let label0;
    	let t1;
    	let input0;
    	let input0_id_value;
    	let input0_placeholder_value;
    	let t2;
    	let label1;
    	let t4;
    	let input1;
    	let input1_id_value;
    	let input1_placeholder_value;
    	let t5;
    	let label2;
    	let t7;
    	let input2;
    	let input2_id_value;
    	let input2_placeholder_value;
    	let t8;
    	let label3;
    	let t10;
    	let input3;
    	let input3_id_value;
    	let t11;
    	let input4;
    	let input4_placeholder_value;
    	let t12;
    	let label4;
    	let t14;
    	let input5;
    	let input5_id_value;
    	let input5_placeholder_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			form = element("form");
    			label0 = element("label");
    			label0.textContent = "Label";
    			t1 = space();
    			input0 = element("input");
    			t2 = space();
    			label1 = element("label");
    			label1.textContent = "Width";
    			t4 = space();
    			input1 = element("input");
    			t5 = space();
    			label2 = element("label");
    			label2.textContent = "Height";
    			t7 = space();
    			input2 = element("input");
    			t8 = space();
    			label3 = element("label");
    			label3.textContent = "Background Color";
    			t10 = space();
    			input3 = element("input");
    			t11 = space();
    			input4 = element("input");
    			t12 = space();
    			label4 = element("label");
    			label4.textContent = "Custom Class";
    			t14 = space();
    			input5 = element("input");
    			attr_dev(label0, "for", "label-input");
    			attr_dev(label0, "class", "svelte-1wtzc22");
    			add_location(label0, file$a, 53, 4, 1456);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", input0_id_value = "label-input-" + /*key*/ ctx[0]);

    			attr_dev(input0, "placeholder", input0_placeholder_value = /*currentNode*/ ctx[7].data.label
    			? /*currentNode*/ ctx[7].data.label
    			: 'None');

    			attr_dev(input0, "class", "svelte-1wtzc22");
    			add_location(input0, file$a, 54, 4, 1499);
    			attr_dev(label1, "for", "width-input");
    			attr_dev(label1, "class", "svelte-1wtzc22");
    			add_location(label1, file$a, 55, 4, 1661);
    			attr_dev(input1, "type", "number");
    			attr_dev(input1, "id", input1_id_value = "width-input-" + /*key*/ ctx[0]);
    			attr_dev(input1, "placeholder", input1_placeholder_value = /*currentNode*/ ctx[7].width);
    			attr_dev(input1, "class", "svelte-1wtzc22");
    			add_location(input1, file$a, 56, 4, 1704);
    			attr_dev(label2, "for", "height-input");
    			attr_dev(label2, "class", "svelte-1wtzc22");
    			add_location(label2, file$a, 57, 4, 1806);
    			attr_dev(input2, "type", "number");
    			attr_dev(input2, "id", input2_id_value = "height-input-" + /*key*/ ctx[0]);
    			attr_dev(input2, "placeholder", input2_placeholder_value = /*currentNode*/ ctx[7].height);
    			attr_dev(input2, "class", "svelte-1wtzc22");
    			add_location(input2, file$a, 58, 4, 1851);
    			attr_dev(label3, "for", "bg-color-input");
    			attr_dev(label3, "class", "svelte-1wtzc22");
    			add_location(label3, file$a, 59, 4, 1956);
    			attr_dev(input3, "type", "color");
    			attr_dev(input3, "id", input3_id_value = "bg-color-input-" + /*key*/ ctx[0]);
    			attr_dev(input3, "class", "bgci svelte-1wtzc22");
    			add_location(input3, file$a, 60, 4, 2013);
    			attr_dev(input4, "type", "text");
    			attr_dev(input4, "placeholder", input4_placeholder_value = /*currentNode*/ ctx[7].bgColor);
    			attr_dev(input4, "class", "svelte-1wtzc22");
    			add_location(input4, file$a, 61, 4, 2107);
    			attr_dev(label4, "for", "custom-class-input");
    			attr_dev(label4, "class", "svelte-1wtzc22");
    			add_location(label4, file$a, 62, 4, 2196);
    			attr_dev(input5, "type", "text");
    			attr_dev(input5, "id", input5_id_value = "custom-class-input-" + /*key*/ ctx[0]);

    			attr_dev(input5, "placeholder", input5_placeholder_value = /*currentNode*/ ctx[7].className
    			? /*currentNode*/ ctx[7].className
    			: 'None');

    			attr_dev(input5, "class", "svelte-1wtzc22");
    			add_location(input5, file$a, 63, 4, 2253);
    			attr_dev(form, "class", "svelte-1wtzc22");
    			add_location(form, file$a, 52, 2, 1424);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, form, anchor);
    			append_dev(form, label0);
    			append_dev(form, t1);
    			append_dev(form, input0);
    			set_input_value(input0, /*label*/ ctx[2]);
    			append_dev(form, t2);
    			append_dev(form, label1);
    			append_dev(form, t4);
    			append_dev(form, input1);
    			set_input_value(input1, /*width*/ ctx[3]);
    			append_dev(form, t5);
    			append_dev(form, label2);
    			append_dev(form, t7);
    			append_dev(form, input2);
    			set_input_value(input2, /*height*/ ctx[4]);
    			append_dev(form, t8);
    			append_dev(form, label3);
    			append_dev(form, t10);
    			append_dev(form, input3);
    			set_input_value(input3, /*backgroundColor*/ ctx[6]);
    			append_dev(form, t11);
    			append_dev(form, input4);
    			set_input_value(input4, /*backgroundColor*/ ctx[6]);
    			append_dev(form, t12);
    			append_dev(form, label4);
    			append_dev(form, t14);
    			append_dev(form, input5);
    			set_input_value(input5, /*customClass*/ ctx[5]);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input0, "input", /*input0_input_handler*/ ctx[14]),
    					listen_dev(input0, "input", /*changeLabel*/ ctx[12], false, false, false),
    					listen_dev(input1, "input", /*input1_input_handler*/ ctx[15]),
    					listen_dev(input2, "input", /*input2_input_handler*/ ctx[16]),
    					listen_dev(input3, "input", /*input3_input_handler*/ ctx[17]),
    					listen_dev(input4, "input", /*input4_input_handler*/ ctx[18]),
    					listen_dev(input5, "input", /*input5_input_handler*/ ctx[19]),
    					listen_dev(form, "submit", /*editNode*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*key*/ 1 && input0_id_value !== (input0_id_value = "label-input-" + /*key*/ ctx[0])) {
    				attr_dev(input0, "id", input0_id_value);
    			}

    			if (dirty & /*currentNode*/ 128 && input0_placeholder_value !== (input0_placeholder_value = /*currentNode*/ ctx[7].data.label
    			? /*currentNode*/ ctx[7].data.label
    			: 'None')) {
    				attr_dev(input0, "placeholder", input0_placeholder_value);
    			}

    			if (dirty & /*label*/ 4 && input0.value !== /*label*/ ctx[2]) {
    				set_input_value(input0, /*label*/ ctx[2]);
    			}

    			if (dirty & /*key*/ 1 && input1_id_value !== (input1_id_value = "width-input-" + /*key*/ ctx[0])) {
    				attr_dev(input1, "id", input1_id_value);
    			}

    			if (dirty & /*currentNode*/ 128 && input1_placeholder_value !== (input1_placeholder_value = /*currentNode*/ ctx[7].width)) {
    				attr_dev(input1, "placeholder", input1_placeholder_value);
    			}

    			if (dirty & /*width*/ 8 && to_number(input1.value) !== /*width*/ ctx[3]) {
    				set_input_value(input1, /*width*/ ctx[3]);
    			}

    			if (dirty & /*key*/ 1 && input2_id_value !== (input2_id_value = "height-input-" + /*key*/ ctx[0])) {
    				attr_dev(input2, "id", input2_id_value);
    			}

    			if (dirty & /*currentNode*/ 128 && input2_placeholder_value !== (input2_placeholder_value = /*currentNode*/ ctx[7].height)) {
    				attr_dev(input2, "placeholder", input2_placeholder_value);
    			}

    			if (dirty & /*height*/ 16 && to_number(input2.value) !== /*height*/ ctx[4]) {
    				set_input_value(input2, /*height*/ ctx[4]);
    			}

    			if (dirty & /*key*/ 1 && input3_id_value !== (input3_id_value = "bg-color-input-" + /*key*/ ctx[0])) {
    				attr_dev(input3, "id", input3_id_value);
    			}

    			if (dirty & /*backgroundColor*/ 64) {
    				set_input_value(input3, /*backgroundColor*/ ctx[6]);
    			}

    			if (dirty & /*currentNode*/ 128 && input4_placeholder_value !== (input4_placeholder_value = /*currentNode*/ ctx[7].bgColor)) {
    				attr_dev(input4, "placeholder", input4_placeholder_value);
    			}

    			if (dirty & /*backgroundColor*/ 64 && input4.value !== /*backgroundColor*/ ctx[6]) {
    				set_input_value(input4, /*backgroundColor*/ ctx[6]);
    			}

    			if (dirty & /*key*/ 1 && input5_id_value !== (input5_id_value = "custom-class-input-" + /*key*/ ctx[0])) {
    				attr_dev(input5, "id", input5_id_value);
    			}

    			if (dirty & /*currentNode*/ 128 && input5_placeholder_value !== (input5_placeholder_value = /*currentNode*/ ctx[7].className
    			? /*currentNode*/ ctx[7].className
    			: 'None')) {
    				attr_dev(input5, "placeholder", input5_placeholder_value);
    			}

    			if (dirty & /*customClass*/ 32 && input5.value !== /*customClass*/ ctx[5]) {
    				set_input_value(input5, /*customClass*/ ctx[5]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(form);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(52:2) {#if currentNode}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let div1;
    	let h4;
    	let t1;
    	let t2;
    	let div0;
    	let button0;
    	let t4;
    	let button1;
    	let div0_class_value;
    	let div1_class_value;
    	let mounted;
    	let dispose;
    	let if_block = /*currentNode*/ ctx[7] && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			h4 = element("h4");
    			h4.textContent = "Edit Attributes";
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Delete Node";
    			t4 = space();
    			button1 = element("button");
    			button1.textContent = "Submit";
    			add_location(h4, file$a, 50, 2, 1377);
    			attr_dev(button0, "class", "svelte-1wtzc22");
    			add_location(button0, file$a, 67, 4, 2471);
    			attr_dev(button1, "class", "svelte-1wtzc22");
    			add_location(button1, file$a, 72, 4, 2650);
    			attr_dev(div0, "class", div0_class_value = "btn-container-" + /*key*/ ctx[0] + " btn-container" + " svelte-1wtzc22");
    			add_location(div0, file$a, 66, 2, 2419);
    			attr_dev(div1, "class", div1_class_value = "edit-modal edit-modal-" + /*key*/ ctx[0] + " svelte-1wtzc22");
    			add_location(div1, file$a, 49, 0, 1333);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, h4);
    			append_dev(div1, t1);
    			if (if_block) if_block.m(div1, null);
    			append_dev(div1, t2);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t4);
    			append_dev(div0, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[20], false, false, false),
    					listen_dev(button1, "click", /*editNode*/ ctx[11], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*currentNode*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(div1, t2);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*key*/ 1 && div0_class_value !== (div0_class_value = "btn-container-" + /*key*/ ctx[0] + " btn-container" + " svelte-1wtzc22")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (dirty & /*key*/ 1 && div1_class_value !== (div1_class_value = "edit-modal edit-modal-" + /*key*/ ctx[0] + " svelte-1wtzc22")) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (if_block) if_block.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let store;
    	let $nodesStore;
    	let $nodeIdSelected;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('EditModal', slots, []);
    	let { key } = $$props;
    	let label;
    	let width;
    	let height;
    	let customClass;
    	let backgroundColor;
    	let currentNode;
    	const { nodesStore, nodeIdSelected, deleteNode } = findOrCreateStore(key);
    	validate_store(nodesStore, 'nodesStore');
    	component_subscribe($$self, nodesStore, value => $$invalidate(13, $nodesStore = value));
    	validate_store(nodeIdSelected, 'nodeIdSelected');
    	component_subscribe($$self, nodeIdSelected, value => $$invalidate(1, $nodeIdSelected = value));

    	const editNode = e => {
    		e.preventDefault();
    		const currentNode = $nodesStore.filter(n => n.id === $nodeIdSelected)[0];
    		if (label) currentNode.data.label = label;
    		if (width) currentNode.width = +width;
    		if (height) currentNode.height = +height;
    		if (customClass) currentNode.className = customClass;
    		if (backgroundColor) currentNode.bgColor = backgroundColor;
    		$$invalidate(3, width = '');
    		$$invalidate(4, height = '');
    		$$invalidate(5, customClass = '');
    		$$invalidate(2, label = '');
    		store.nodesStore.set($nodesStore);
    		document.querySelector(`.edit-modal-${key}`).style.display = 'none';
    	};

    	const changeLabel = e => {
    		const currentNode = $nodesStore.filter(n => n.id === $nodeIdSelected)[0];
    		currentNode.data.label = e.target.value;
    		store.nodesStore.set($nodesStore);
    	};

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<EditModal> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<EditModal> was created with unknown prop '${key}'`);
    	});

    	function input0_input_handler() {
    		label = this.value;
    		$$invalidate(2, label);
    	}

    	function input1_input_handler() {
    		width = to_number(this.value);
    		$$invalidate(3, width);
    	}

    	function input2_input_handler() {
    		height = to_number(this.value);
    		$$invalidate(4, height);
    	}

    	function input3_input_handler() {
    		backgroundColor = this.value;
    		$$invalidate(6, backgroundColor);
    	}

    	function input4_input_handler() {
    		backgroundColor = this.value;
    		$$invalidate(6, backgroundColor);
    	}

    	function input5_input_handler() {
    		customClass = this.value;
    		$$invalidate(5, customClass);
    	}

    	const click_handler = e => {
    		deleteNode(e, $nodeIdSelected);
    		document.querySelector(`.edit-modal-${key}`).style.display = 'none';
    	};

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		key,
    		label,
    		width,
    		height,
    		customClass,
    		backgroundColor,
    		currentNode,
    		nodesStore,
    		nodeIdSelected,
    		deleteNode,
    		editNode,
    		changeLabel,
    		store,
    		$nodesStore,
    		$nodeIdSelected
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('label' in $$props) $$invalidate(2, label = $$props.label);
    		if ('width' in $$props) $$invalidate(3, width = $$props.width);
    		if ('height' in $$props) $$invalidate(4, height = $$props.height);
    		if ('customClass' in $$props) $$invalidate(5, customClass = $$props.customClass);
    		if ('backgroundColor' in $$props) $$invalidate(6, backgroundColor = $$props.backgroundColor);
    		if ('currentNode' in $$props) $$invalidate(7, currentNode = $$props.currentNode);
    		if ('store' in $$props) store = $$props.store;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*key*/ 1) {
    			store = findOrCreateStore(key);
    		}

    		if ($$self.$$.dirty & /*$nodesStore, $nodeIdSelected*/ 8194) {
    			$$invalidate(7, currentNode = $nodesStore.filter(n => n.id === $nodeIdSelected)[0]);
    		}
    	};

    	return [
    		key,
    		$nodeIdSelected,
    		label,
    		width,
    		height,
    		customClass,
    		backgroundColor,
    		currentNode,
    		nodesStore,
    		nodeIdSelected,
    		deleteNode,
    		editNode,
    		changeLabel,
    		$nodesStore,
    		input0_input_handler,
    		input1_input_handler,
    		input2_input_handler,
    		input3_input_handler,
    		input4_input_handler,
    		input5_input_handler,
    		click_handler
    	];
    }

    class EditModal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { key: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "EditModal",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get key() {
    		throw new Error("<EditModal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<EditModal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Minimap/GreyNodeBoundless.svelte generated by Svelte v3.55.1 */

    const file$9 = "node_modules/svelvet/Containers/Minimap/GreyNodeBoundless.svelte";

    function create_fragment$9(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "nodes nodes-" + /*key*/ ctx[0] + " svelte-1rvz19b");
    			set_style(div, "top", /*top*/ ctx[1] + "px");
    			set_style(div, "left", /*left*/ ctx[2] + "px");
    			set_style(div, "height", /*nHeight*/ ctx[4] + "px");
    			set_style(div, "width", /*nWidth*/ ctx[3] + "px");
    			add_location(div, file$9, 23, 0, 699);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*key*/ 1 && div_class_value !== (div_class_value = "nodes nodes-" + /*key*/ ctx[0] + " svelte-1rvz19b")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*top*/ 2) {
    				set_style(div, "top", /*top*/ ctx[1] + "px");
    			}

    			if (dirty & /*left*/ 4) {
    				set_style(div, "left", /*left*/ ctx[2] + "px");
    			}

    			if (dirty & /*nHeight*/ 16) {
    				set_style(div, "height", /*nHeight*/ ctx[4] + "px");
    			}

    			if (dirty & /*nWidth*/ 8) {
    				set_style(div, "width", /*nWidth*/ ctx[3] + "px");
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GreyNodeBoundless', slots, []);
    	let { key } = $$props;
    	let { node } = $$props;
    	let { heightRatio } = $$props;
    	let { widthRatio } = $$props;
    	let { nodeXleftPosition } = $$props;
    	let { nodeYbottomPosition } = $$props;
    	let top = 0;
    	let left = 0;
    	let nWidth = 0;
    	let nHeight = 0;

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'key'");
    		}

    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'node'");
    		}

    		if (heightRatio === undefined && !('heightRatio' in $$props || $$self.$$.bound[$$self.$$.props['heightRatio']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'heightRatio'");
    		}

    		if (widthRatio === undefined && !('widthRatio' in $$props || $$self.$$.bound[$$self.$$.props['widthRatio']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'widthRatio'");
    		}

    		if (nodeXleftPosition === undefined && !('nodeXleftPosition' in $$props || $$self.$$.bound[$$self.$$.props['nodeXleftPosition']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'nodeXleftPosition'");
    		}

    		if (nodeYbottomPosition === undefined && !('nodeYbottomPosition' in $$props || $$self.$$.bound[$$self.$$.props['nodeYbottomPosition']])) {
    			console.warn("<GreyNodeBoundless> was created without expected prop 'nodeYbottomPosition'");
    		}
    	});

    	const writable_props = [
    		'key',
    		'node',
    		'heightRatio',
    		'widthRatio',
    		'nodeXleftPosition',
    		'nodeYbottomPosition'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GreyNodeBoundless> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('node' in $$props) $$invalidate(5, node = $$props.node);
    		if ('heightRatio' in $$props) $$invalidate(6, heightRatio = $$props.heightRatio);
    		if ('widthRatio' in $$props) $$invalidate(7, widthRatio = $$props.widthRatio);
    		if ('nodeXleftPosition' in $$props) $$invalidate(8, nodeXleftPosition = $$props.nodeXleftPosition);
    		if ('nodeYbottomPosition' in $$props) $$invalidate(9, nodeYbottomPosition = $$props.nodeYbottomPosition);
    	};

    	$$self.$capture_state = () => ({
    		key,
    		node,
    		heightRatio,
    		widthRatio,
    		nodeXleftPosition,
    		nodeYbottomPosition,
    		top,
    		left,
    		nWidth,
    		nHeight
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('node' in $$props) $$invalidate(5, node = $$props.node);
    		if ('heightRatio' in $$props) $$invalidate(6, heightRatio = $$props.heightRatio);
    		if ('widthRatio' in $$props) $$invalidate(7, widthRatio = $$props.widthRatio);
    		if ('nodeXleftPosition' in $$props) $$invalidate(8, nodeXleftPosition = $$props.nodeXleftPosition);
    		if ('nodeYbottomPosition' in $$props) $$invalidate(9, nodeYbottomPosition = $$props.nodeYbottomPosition);
    		if ('top' in $$props) $$invalidate(1, top = $$props.top);
    		if ('left' in $$props) $$invalidate(2, left = $$props.left);
    		if ('nWidth' in $$props) $$invalidate(3, nWidth = $$props.nWidth);
    		if ('nHeight' in $$props) $$invalidate(4, nHeight = $$props.nHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*node, heightRatio, widthRatio, nodeYbottomPosition, nodeXleftPosition*/ 992) {
    			//nHeight/nWidth repreesnt the height and width of the grey nodes
    			//top/left represent the actual position of the grey nodes on the minimap
    			{
    				$$invalidate(4, nHeight = Math.max(node.height * heightRatio, 5));
    				$$invalidate(3, nWidth = Math.max(node.width * widthRatio, 5));
    				$$invalidate(1, top = node.position.y * heightRatio - nodeYbottomPosition * heightRatio + 1);
    				$$invalidate(2, left = node.position.x * widthRatio - nodeXleftPosition * widthRatio + 1);
    			}
    		}
    	};

    	return [
    		key,
    		top,
    		left,
    		nWidth,
    		nHeight,
    		node,
    		heightRatio,
    		widthRatio,
    		nodeXleftPosition,
    		nodeYbottomPosition
    	];
    }

    class GreyNodeBoundless extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			key: 0,
    			node: 5,
    			heightRatio: 6,
    			widthRatio: 7,
    			nodeXleftPosition: 8,
    			nodeYbottomPosition: 9
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GreyNodeBoundless",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get key() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get node() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get heightRatio() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set heightRatio(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get widthRatio() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set widthRatio(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nodeXleftPosition() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodeXleftPosition(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nodeYbottomPosition() {
    		throw new Error("<GreyNodeBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodeYbottomPosition(value) {
    		throw new Error("<GreyNodeBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Minimap/MinimapBoundless.svelte generated by Svelte v3.55.1 */
    const file$8 = "node_modules/svelvet/Containers/Minimap/MinimapBoundless.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[31] = list[i];
    	return child_ctx;
    }

    // (99:8) {#each $nodesStore as node}
    function create_each_block$4(ctx) {
    	let greynode;
    	let current;

    	greynode = new GreyNodeBoundless({
    			props: {
    				node: /*node*/ ctx[31],
    				key: /*key*/ ctx[0],
    				heightRatio: /*heightRatio*/ ctx[3],
    				widthRatio: /*widthRatio*/ ctx[4],
    				nodeXleftPosition: /*nodeXleftPosition*/ ctx[5],
    				nodeYbottomPosition: /*nodeYbottomPosition*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(greynode.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(greynode, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const greynode_changes = {};
    			if (dirty[0] & /*$nodesStore*/ 128) greynode_changes.node = /*node*/ ctx[31];
    			if (dirty[0] & /*key*/ 1) greynode_changes.key = /*key*/ ctx[0];
    			if (dirty[0] & /*heightRatio*/ 8) greynode_changes.heightRatio = /*heightRatio*/ ctx[3];
    			if (dirty[0] & /*widthRatio*/ 16) greynode_changes.widthRatio = /*widthRatio*/ ctx[4];
    			if (dirty[0] & /*nodeXleftPosition*/ 32) greynode_changes.nodeXleftPosition = /*nodeXleftPosition*/ ctx[5];
    			if (dirty[0] & /*nodeYbottomPosition*/ 64) greynode_changes.nodeYbottomPosition = /*nodeYbottomPosition*/ ctx[6];
    			greynode.$set(greynode_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(greynode.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(greynode.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(greynode, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(99:8) {#each $nodesStore as node}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let t;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*$nodesStore*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", div0_class_value = "viewBox viewBox-" + /*key*/ ctx[0] + " svelte-1hwr1xr");
    			set_style(div0, "height", /*viewHeight*/ ctx[8] + "px");
    			set_style(div0, "width", /*viewWidth*/ ctx[9] + "px");
    			set_style(div0, "top", /*viewBottom*/ ctx[11] + "px");
    			set_style(div0, "left", /*viewRight*/ ctx[10] + "px");
    			add_location(div0, file$8, 97, 8, 3967);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`miniMap miniMap-${/*key*/ ctx[0]}`) + " svelte-1hwr1xr"));
    			set_style(div1, "height", /*mapHeight*/ ctx[2] + 20 + "px");
    			set_style(div1, "width", /*mapWidth*/ ctx[1] + 20 + "px");
    			add_location(div1, file$8, 96, 4, 3798);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			/*div1_binding*/ ctx[24](div1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*handleClick*/ ctx[16], false, false, false),
    					listen_dev(div1, "keydown", keydown_handler$4, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty[0] & /*key*/ 1 && div0_class_value !== (div0_class_value = "viewBox viewBox-" + /*key*/ ctx[0] + " svelte-1hwr1xr")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty[0] & /*viewHeight*/ 256) {
    				set_style(div0, "height", /*viewHeight*/ ctx[8] + "px");
    			}

    			if (!current || dirty[0] & /*viewWidth*/ 512) {
    				set_style(div0, "width", /*viewWidth*/ ctx[9] + "px");
    			}

    			if (!current || dirty[0] & /*viewBottom*/ 2048) {
    				set_style(div0, "top", /*viewBottom*/ ctx[11] + "px");
    			}

    			if (!current || dirty[0] & /*viewRight*/ 1024) {
    				set_style(div0, "left", /*viewRight*/ ctx[10] + "px");
    			}

    			if (dirty[0] & /*$nodesStore, key, heightRatio, widthRatio, nodeXleftPosition, nodeYbottomPosition*/ 249) {
    				each_value = /*$nodesStore*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty[0] & /*key*/ 1 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`miniMap miniMap-${/*key*/ ctx[0]}`) + " svelte-1hwr1xr"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty[0] & /*mapHeight*/ 4) {
    				set_style(div1, "height", /*mapHeight*/ ctx[2] + 20 + "px");
    			}

    			if (!current || dirty[0] & /*mapWidth*/ 2) {
    				set_style(div1, "width", /*mapWidth*/ ctx[1] + 20 + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			/*div1_binding*/ ctx[24](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$4 = () => {
    	return;
    };

    function instance$8($$self, $$props, $$invalidate) {
    	let $heightStore;
    	let $widthStore;
    	let $nodesStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MinimapBoundless', slots, []);
    	let { key } = $$props;
    	let { d3Translate } = $$props;
    	const svelvetStore = findOrCreateStore(key);
    	const { nodesStore, widthStore, heightStore } = svelvetStore;
    	validate_store(nodesStore, 'nodesStore');
    	component_subscribe($$self, nodesStore, value => $$invalidate(7, $nodesStore = value));
    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(23, $widthStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(22, $heightStore = value));

    	//placeholdervalues for initialization
    	//dispatch for message to be sent
    	const dispatch = createEventDispatcher();

    	let mapMax = 100;
    	let mapWidth = mapMax;
    	let mapHeight = mapMax;
    	let nodeHeight = mapMax - 10;
    	let nodeWidth = mapMax - 10;
    	let viewHeight = 10;
    	let viewWidth = 10;
    	let viewRight = 10;
    	let viewBottom = 10;
    	let heightRatio = 1;
    	let widthRatio = 1;
    	let nodeXleftPosition = Infinity;
    	let nodeYtopPosition = -Infinity;
    	let nodeYbottomPosition = Infinity;
    	let nodeXrightPosition = -Infinity;
    	let map; // y position within the element.
    	let hasBeenClicked = false;
    	const scaleW = v => v * (mapWidth / nodeWidth);
    	const scaleH = v => v * (mapHeight / nodeHeight);

    	//get a scale factor from nodeheight and width
    	//use that scaling factor to make virtual representation of nodes bigger or smaller 
    	//depending on the height and width of the overall structure including all nodes
    	function handleClick(event) {
    		if (!hasBeenClicked) {
    			//bounds grabs map variable coordinates on the map relative to the websites position
    			let bounds = map.getBoundingClientRect();

    			hasBeenClicked = true;

    			dispatch('message', {
    				x: nodeXleftPosition + (event.clientX - bounds.left) / widthRatio,
    				y: nodeYbottomPosition + (event.clientY - bounds.top) / heightRatio
    			});

    			//throttles clicks to prevent map distortion
    			setTimeout(
    				() => {
    					hasBeenClicked = false;
    				},
    				500
    			);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<MinimapBoundless> was created without expected prop 'key'");
    		}

    		if (d3Translate === undefined && !('d3Translate' in $$props || $$self.$$.bound[$$self.$$.props['d3Translate']])) {
    			console.warn("<MinimapBoundless> was created without expected prop 'd3Translate'");
    		}
    	});

    	const writable_props = ['key', 'd3Translate'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MinimapBoundless> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			map = $$value;
    			$$invalidate(12, map);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('d3Translate' in $$props) $$invalidate(17, d3Translate = $$props.d3Translate);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		onMount,
    		createEventDispatcher,
    		GreyNode: GreyNodeBoundless,
    		key,
    		d3Translate,
    		svelvetStore,
    		nodesStore,
    		widthStore,
    		heightStore,
    		dispatch,
    		mapMax,
    		mapWidth,
    		mapHeight,
    		nodeHeight,
    		nodeWidth,
    		viewHeight,
    		viewWidth,
    		viewRight,
    		viewBottom,
    		heightRatio,
    		widthRatio,
    		nodeXleftPosition,
    		nodeYtopPosition,
    		nodeYbottomPosition,
    		nodeXrightPosition,
    		map,
    		hasBeenClicked,
    		scaleW,
    		scaleH,
    		handleClick,
    		$heightStore,
    		$widthStore,
    		$nodesStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('d3Translate' in $$props) $$invalidate(17, d3Translate = $$props.d3Translate);
    		if ('mapMax' in $$props) mapMax = $$props.mapMax;
    		if ('mapWidth' in $$props) $$invalidate(1, mapWidth = $$props.mapWidth);
    		if ('mapHeight' in $$props) $$invalidate(2, mapHeight = $$props.mapHeight);
    		if ('nodeHeight' in $$props) $$invalidate(18, nodeHeight = $$props.nodeHeight);
    		if ('nodeWidth' in $$props) $$invalidate(19, nodeWidth = $$props.nodeWidth);
    		if ('viewHeight' in $$props) $$invalidate(8, viewHeight = $$props.viewHeight);
    		if ('viewWidth' in $$props) $$invalidate(9, viewWidth = $$props.viewWidth);
    		if ('viewRight' in $$props) $$invalidate(10, viewRight = $$props.viewRight);
    		if ('viewBottom' in $$props) $$invalidate(11, viewBottom = $$props.viewBottom);
    		if ('heightRatio' in $$props) $$invalidate(3, heightRatio = $$props.heightRatio);
    		if ('widthRatio' in $$props) $$invalidate(4, widthRatio = $$props.widthRatio);
    		if ('nodeXleftPosition' in $$props) $$invalidate(5, nodeXleftPosition = $$props.nodeXleftPosition);
    		if ('nodeYtopPosition' in $$props) $$invalidate(20, nodeYtopPosition = $$props.nodeYtopPosition);
    		if ('nodeYbottomPosition' in $$props) $$invalidate(6, nodeYbottomPosition = $$props.nodeYbottomPosition);
    		if ('nodeXrightPosition' in $$props) $$invalidate(21, nodeXrightPosition = $$props.nodeXrightPosition);
    		if ('map' in $$props) $$invalidate(12, map = $$props.map);
    		if ('hasBeenClicked' in $$props) hasBeenClicked = $$props.hasBeenClicked;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*$nodesStore, nodeXleftPosition, nodeXrightPosition, nodeYbottomPosition, nodeYtopPosition, nodeHeight, nodeWidth, mapHeight, mapWidth, d3Translate, widthRatio, heightRatio, $widthStore, $heightStore*/ 16646398) {
    			{
    				$$invalidate(5, nodeXleftPosition = Infinity);
    				$$invalidate(20, nodeYtopPosition = -Infinity);
    				$$invalidate(6, nodeYbottomPosition = Infinity);
    				$$invalidate(21, nodeXrightPosition = -Infinity);

    				// looks for the top-most, bottom-most, left-most, right-most values for the furthest node in those perspective values to find the boundaries of the size of the diagram
    				$nodesStore.forEach(node => {
    					$$invalidate(5, nodeXleftPosition = Math.min(nodeXleftPosition, node.position.x));
    					$$invalidate(21, nodeXrightPosition = Math.max(nodeXrightPosition, node.position.x));
    					$$invalidate(6, nodeYbottomPosition = Math.min(nodeYbottomPosition, node.position.y));
    					$$invalidate(20, nodeYtopPosition = Math.max(nodeYtopPosition, node.position.y));
    				});

    				// sets the height, width of nodes after movement
    				$$invalidate(18, nodeHeight = nodeYtopPosition - nodeYbottomPosition);

    				$$invalidate(19, nodeWidth = nodeXrightPosition - nodeXleftPosition);

    				if (nodeHeight > nodeWidth) {
    					$$invalidate(2, mapHeight = 100);
    					$$invalidate(1, mapWidth = Math.max(nodeWidth.toFixed(0) * 100 / nodeHeight.toFixed(0), 25));
    				} else if (nodeHeight < nodeWidth) {
    					$$invalidate(1, mapWidth = 100);
    					$$invalidate(2, mapHeight = Math.max(nodeHeight.toFixed(0) * 100 / nodeWidth.toFixed(0), 25));
    				} else {
    					$$invalidate(2, mapHeight = 100);
    					$$invalidate(1, mapWidth = 100);
    				}

    				$$invalidate(3, heightRatio = (mapHeight / nodeHeight).toFixed(2));
    				$$invalidate(4, widthRatio = (mapWidth / nodeWidth).toFixed(2));

    				// determining the positioning and the size of the viewbox
    				$$invalidate(10, viewRight = scaleW(d3Translate.x * widthRatio - d3Translate.x / d3Translate.k) - nodeXleftPosition * widthRatio);

    				$$invalidate(11, viewBottom = scaleH(d3Translate.y * heightRatio - d3Translate.y / d3Translate.k) - nodeYbottomPosition * heightRatio);
    				$$invalidate(9, viewWidth = $widthStore * widthRatio / d3Translate.k);
    				$$invalidate(8, viewHeight = $heightStore * heightRatio / d3Translate.k);
    			}
    		}
    	};

    	return [
    		key,
    		mapWidth,
    		mapHeight,
    		heightRatio,
    		widthRatio,
    		nodeXleftPosition,
    		nodeYbottomPosition,
    		$nodesStore,
    		viewHeight,
    		viewWidth,
    		viewRight,
    		viewBottom,
    		map,
    		nodesStore,
    		widthStore,
    		heightStore,
    		handleClick,
    		d3Translate,
    		nodeHeight,
    		nodeWidth,
    		nodeYtopPosition,
    		nodeXrightPosition,
    		$heightStore,
    		$widthStore,
    		div1_binding
    	];
    }

    class MinimapBoundless extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, { key: 0, d3Translate: 17 }, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MinimapBoundless",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get key() {
    		throw new Error("<MinimapBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<MinimapBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get d3Translate() {
    		throw new Error("<MinimapBoundless>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set d3Translate(value) {
    		throw new Error("<MinimapBoundless>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Edges/DeleteAnchor.svelte generated by Svelte v3.55.1 */
    const file$7 = "node_modules/svelvet/Edges/DeleteAnchor.svelte";

    function create_fragment$7(ctx) {
    	let div;
    	let svg;
    	let path0;
    	let path1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path0 = svg_element("path");
    			path1 = svg_element("path");
    			attr_dev(path0, "d", "M19 5L5 19");
    			attr_dev(path0, "stroke", "#333333");
    			attr_dev(path0, "stroke-width", "2");
    			attr_dev(path0, "stroke-linecap", "round");
    			add_location(path0, file$7, 56, 79, 1458);
    			attr_dev(path1, "d", "M5 5L19 19");
    			attr_dev(path1, "stroke", "#333333");
    			attr_dev(path1, "stroke-width", "2");
    			attr_dev(path1, "stroke-linecap", "round");
    			add_location(path1, file$7, 56, 165, 1544);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-jne26v");
    			add_location(svg, file$7, 56, 7, 1386);
    			attr_dev(div, "class", "Anchor svelte-jne26v");

    			attr_dev(div, "style", `
        height:${/*anchorHeight*/ ctx[5]}px;
        width:${/*anchorWidth*/ ctx[4]}px;
        top: ${/*top*/ ctx[6]}px;
        left:${/*left*/ ctx[7]}px;
      `);

    			add_location(div, file$7, 24, 4, 467);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path0);
    			append_dev(svg, path1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "mousedown", mousedown_handler, false, false, false),
    					listen_dev(div, "mouseup", /*mouseup_handler*/ ctx[11], false, false, false),
    					listen_dev(div, "mouseenter", /*mouseenter_handler*/ ctx[12], false, false, false),
    					listen_dev(div, "mouseleave", /*mouseleave_handler*/ ctx[13], false, false, false),
    					listen_dev(div, "keydown", keydown_handler$3, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: noop$1,
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const mousedown_handler = e => {
    	e.preventDefault();
    	e.stopPropagation(); // Important! Prevents the event from firing on the parent element (the .Nodes div) 
    };

    const keydown_handler$3 = () => {
    	return;
    };

    function instance$7($$self, $$props, $$invalidate) {
    	let store;
    	let $derivedEdges;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DeleteAnchor', slots, []);
    	let { key } = $$props;
    	let { node } = $$props;
    	let hovered = false;
    	let anchorWidth = 13;
    	let anchorHeight = 13;
    	let top = 0;
    	let left = 0;
    	const { deleteNode, derivedEdges } = findOrCreateStore(key);
    	validate_store(derivedEdges, 'derivedEdges');
    	component_subscribe($$self, derivedEdges, value => $$invalidate(3, $derivedEdges = value));

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<DeleteAnchor> was created without expected prop 'key'");
    		}

    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<DeleteAnchor> was created without expected prop 'node'");
    		}
    	});

    	const writable_props = ['key', 'node'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DeleteAnchor> was created with unknown prop '${key}'`);
    	});

    	const mouseup_handler = e => {
    		e.preventDefault();
    		deleteNode(e, node.id);
    	};

    	const mouseenter_handler = e => {
    		$$invalidate(1, hovered = true);
    		store.hoveredElement.set(node); // If the mouse enters an anchor, we store the node it's attached to for reference
    	};

    	const mouseleave_handler = e => {
    		store.edgesStore.set($derivedEdges);
    		$$invalidate(1, hovered = false);
    		store.hoveredElement.set(null); // When the mouse leaves an anchor, we clear the value in the store
    	};

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(10, key = $$props.key);
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		key,
    		node,
    		hovered,
    		anchorWidth,
    		anchorHeight,
    		top,
    		left,
    		deleteNode,
    		derivedEdges,
    		store,
    		$derivedEdges
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(10, key = $$props.key);
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('hovered' in $$props) $$invalidate(1, hovered = $$props.hovered);
    		if ('anchorWidth' in $$props) $$invalidate(4, anchorWidth = $$props.anchorWidth);
    		if ('anchorHeight' in $$props) $$invalidate(5, anchorHeight = $$props.anchorHeight);
    		if ('top' in $$props) $$invalidate(6, top = $$props.top);
    		if ('left' in $$props) $$invalidate(7, left = $$props.left);
    		if ('store' in $$props) $$invalidate(2, store = $$props.store);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*key*/ 1024) {
    			$$invalidate(2, store = findOrCreateStore(key));
    		}
    	};

    	return [
    		node,
    		hovered,
    		store,
    		$derivedEdges,
    		anchorWidth,
    		anchorHeight,
    		top,
    		left,
    		deleteNode,
    		derivedEdges,
    		key,
    		mouseup_handler,
    		mouseenter_handler,
    		mouseleave_handler
    	];
    }

    class DeleteAnchor extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, { key: 10, node: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DeleteAnchor",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get key() {
    		throw new Error("<DeleteAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<DeleteAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get node() {
    		throw new Error("<DeleteAnchor>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<DeleteAnchor>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Nodes/index.svelte generated by Svelte v3.55.1 */
    const file$6 = "node_modules/svelvet/Nodes/index.svelte";

    // (134:0) {#if node.delete || $deleteNodes}
    function create_if_block_2$2(ctx) {
    	let deleteanchor;
    	let current;

    	deleteanchor = new DeleteAnchor({
    			props: {
    				key: /*key*/ ctx[1],
    				node: /*node*/ ctx[0]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(deleteanchor.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(deleteanchor, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const deleteanchor_changes = {};
    			if (dirty[0] & /*key*/ 2) deleteanchor_changes.key = /*key*/ ctx[1];
    			if (dirty[0] & /*node*/ 1) deleteanchor_changes.node = /*node*/ ctx[0];
    			deleteanchor.$set(deleteanchor_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(deleteanchor.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(deleteanchor.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(deleteanchor, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(134:0) {#if node.delete || $deleteNodes}",
    		ctx
    	});

    	return block;
    }

    // (152:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[29].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[28], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			add_location(div, file$6, 152, 6, 3900);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty[0] & /*$$scope*/ 268435456)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[28],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[28])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[28], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(152:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (148:30) 
    function create_if_block_1$2(ctx) {
    	let div;
    	let p;
    	let t_value = /*node*/ ctx[0].data.label + "";
    	let t;

    	const block = {
    		c: function create() {
    			div = element("div");
    			p = element("p");
    			t = text(t_value);
    			add_location(p, file$6, 149, 8, 3840);
    			add_location(div, file$6, 148, 6, 3826);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, p);
    			append_dev(p, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*node*/ 1 && t_value !== (t_value = /*node*/ ctx[0].data.label + "")) set_data_dev(t, t_value);
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(148:30) ",
    		ctx
    	});

    	return block;
    }

    // (140:4) {#if node.image}
    function create_if_block$2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", /*node*/ ctx[0].width * 0.85 + "px");
    			set_style(img, "height", /*node*/ ctx[0].height * 0.85 + "px");
    			set_style(img, "overflow", "hidden");
    			add_location(img, file$6, 140, 6, 3623);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*node*/ 1 && !src_url_equal(img.src, img_src_value = /*node*/ ctx[0].src)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty[0] & /*node*/ 1) {
    				set_style(img, "width", /*node*/ ctx[0].width * 0.85 + "px");
    			}

    			if (dirty[0] & /*node*/ 1) {
    				set_style(img, "height", /*node*/ ctx[0].height * 0.85 + "px");
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(140:4) {#if node.image}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div;
    	let t0;
    	let edgeanchor0;
    	let t1;
    	let current_block_type_index;
    	let if_block1;
    	let t2;
    	let edgeanchor1;
    	let div_class_value;
    	let div_style_value;
    	let div_id_value;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = (/*node*/ ctx[0].delete || /*$deleteNodes*/ ctx[14]) && create_if_block_2$2(ctx);

    	edgeanchor0 = new EdgeAnchor({
    			props: {
    				key: /*key*/ ctx[1],
    				node: /*node*/ ctx[0],
    				width: /*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width,
    				height: /*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height,
    				position: /*node*/ ctx[0].targetPosition || 'top',
    				role: 'target'
    			},
    			$$inline: true
    		});

    	const if_block_creators = [create_if_block$2, create_if_block_1$2, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*node*/ ctx[0].image) return 0;
    		if (/*node*/ ctx[0].data.label) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	edgeanchor1 = new EdgeAnchor({
    			props: {
    				key: /*key*/ ctx[1],
    				node: /*node*/ ctx[0],
    				width: /*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width,
    				height: /*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height,
    				position: /*node*/ ctx[0].sourcePosition || 'bottom',
    				role: 'source'
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(edgeanchor0.$$.fragment);
    			t1 = space();
    			if_block1.c();
    			t2 = space();
    			create_component(edgeanchor1.$$.fragment);
    			attr_dev(div, "class", div_class_value = "Node " + (/*node*/ ctx[0].className || '') + " svelte-bspow7");
    			attr_dev(div, "style", div_style_value = "left: " + /*node*/ ctx[0].position.x + "px; top: " + /*node*/ ctx[0].position.y + "px; width: " + (/*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width) + "px; height: " + (/*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height) + "px; background-color: " + /*node*/ ctx[0].bgColor + "; border-color: " + /*node*/ ctx[0].borderColor + "; border-radius: " + /*node*/ ctx[0].borderRadius + "px; color: " + /*node*/ ctx[0].textColor + "; " + /*customCssText*/ ctx[3]);
    			attr_dev(div, "id", div_id_value = "svelvet-" + /*node*/ ctx[0].id);
    			add_location(div, file$6, 82, 0, 2242);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if (if_block0) if_block0.m(div, null);
    			append_dev(div, t0);
    			mount_component(edgeanchor0, div, null);
    			append_dev(div, t1);
    			if_blocks[current_block_type_index].m(div, null);
    			append_dev(div, t2);
    			mount_component(edgeanchor1, div, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window, "mousemove", /*mousemove_handler*/ ctx[30], false, false, false),
    					listen_dev(window, "mouseup", /*mouseup_handler*/ ctx[31], false, false, false),
    					listen_dev(div, "mouseup", /*mouseup_handler_1*/ ctx[32], false, false, false),
    					listen_dev(div, "contextmenu", /*contextmenu_handler*/ ctx[33], false, false, false),
    					listen_dev(div, "touchmove", /*touchmove_handler*/ ctx[34], false, false, false),
    					listen_dev(div, "touchstart", /*touchstart_handler*/ ctx[35], false, false, false),
    					listen_dev(div, "touchend", /*touchend_handler*/ ctx[36], false, false, false),
    					listen_dev(div, "mousedown", /*mousedown_handler*/ ctx[37], false, false, false),
    					listen_dev(div, "keydown", keydown_handler$2, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (/*node*/ ctx[0].delete || /*$deleteNodes*/ ctx[14]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty[0] & /*node, $deleteNodes*/ 16385) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			const edgeanchor0_changes = {};
    			if (dirty[0] & /*key*/ 2) edgeanchor0_changes.key = /*key*/ ctx[1];
    			if (dirty[0] & /*node*/ 1) edgeanchor0_changes.node = /*node*/ ctx[0];
    			if (dirty[0] & /*nodeWidth, node*/ 17) edgeanchor0_changes.width = /*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width;
    			if (dirty[0] & /*nodeHeight, node*/ 33) edgeanchor0_changes.height = /*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height;
    			if (dirty[0] & /*node*/ 1) edgeanchor0_changes.position = /*node*/ ctx[0].targetPosition || 'top';
    			edgeanchor0.$set(edgeanchor0_changes);
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks[current_block_type_index];

    				if (!if_block1) {
    					if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block1.c();
    				} else {
    					if_block1.p(ctx, dirty);
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(div, t2);
    			}

    			const edgeanchor1_changes = {};
    			if (dirty[0] & /*key*/ 2) edgeanchor1_changes.key = /*key*/ ctx[1];
    			if (dirty[0] & /*node*/ 1) edgeanchor1_changes.node = /*node*/ ctx[0];
    			if (dirty[0] & /*nodeWidth, node*/ 17) edgeanchor1_changes.width = /*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width;
    			if (dirty[0] & /*nodeHeight, node*/ 33) edgeanchor1_changes.height = /*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height;
    			if (dirty[0] & /*node*/ 1) edgeanchor1_changes.position = /*node*/ ctx[0].sourcePosition || 'bottom';
    			edgeanchor1.$set(edgeanchor1_changes);

    			if (!current || dirty[0] & /*node*/ 1 && div_class_value !== (div_class_value = "Node " + (/*node*/ ctx[0].className || '') + " svelte-bspow7")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (!current || dirty[0] & /*node, nodeWidth, nodeHeight, customCssText*/ 57 && div_style_value !== (div_style_value = "left: " + /*node*/ ctx[0].position.x + "px; top: " + /*node*/ ctx[0].position.y + "px; width: " + (/*nodeWidth*/ ctx[4] || /*node*/ ctx[0].width) + "px; height: " + (/*nodeHeight*/ ctx[5] || /*node*/ ctx[0].height) + "px; background-color: " + /*node*/ ctx[0].bgColor + "; border-color: " + /*node*/ ctx[0].borderColor + "; border-radius: " + /*node*/ ctx[0].borderRadius + "px; color: " + /*node*/ ctx[0].textColor + "; " + /*customCssText*/ ctx[3])) {
    				attr_dev(div, "style", div_style_value);
    			}

    			if (!current || dirty[0] & /*node*/ 1 && div_id_value !== (div_id_value = "svelvet-" + /*node*/ ctx[0].id)) {
    				attr_dev(div, "id", div_id_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(edgeanchor0.$$.fragment, local);
    			transition_in(if_block1);
    			transition_in(edgeanchor1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(edgeanchor0.$$.fragment, local);
    			transition_out(if_block1);
    			transition_out(edgeanchor1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block0) if_block0.d();
    			destroy_component(edgeanchor0);
    			if_blocks[current_block_type_index].d();
    			destroy_component(edgeanchor1);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$2 = () => {
    	return;
    };

    function instance$6($$self, $$props, $$invalidate) {
    	let shouldMove;
    	let $nodeIdSelected;
    	let $movementStore;
    	let $isLocked;
    	let $snapgrid;
    	let $snapResize;
    	let $nodeSelected;
    	let $nodeEditStore;
    	let $deleteNodes;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nodes', slots, ['default']);
    	let { node } = $$props;
    	let { key } = $$props;

    	// Lines 9-11 are related to node custom classes
    	let customCssText = '';

    	let nodeWidth;
    	let nodeHeight;
    	const { onNodeMove, onNodeClick, onTouchMove, getStyles, nodeSelected, nodeIdSelected, movementStore, snapgrid, snapResize, isLocked, nodeEditStore, deleteNodes } = findOrCreateStore(key);
    	validate_store(nodeSelected, 'nodeSelected');
    	component_subscribe($$self, nodeSelected, value => $$invalidate(12, $nodeSelected = value));
    	validate_store(nodeIdSelected, 'nodeIdSelected');
    	component_subscribe($$self, nodeIdSelected, value => $$invalidate(8, $nodeIdSelected = value));
    	validate_store(movementStore, 'movementStore');
    	component_subscribe($$self, movementStore, value => $$invalidate(27, $movementStore = value));
    	validate_store(snapgrid, 'snapgrid');
    	component_subscribe($$self, snapgrid, value => $$invalidate(10, $snapgrid = value));
    	validate_store(snapResize, 'snapResize');
    	component_subscribe($$self, snapResize, value => $$invalidate(11, $snapResize = value));
    	validate_store(isLocked, 'isLocked');
    	component_subscribe($$self, isLocked, value => $$invalidate(9, $isLocked = value));
    	validate_store(nodeEditStore, 'nodeEditStore');
    	component_subscribe($$self, nodeEditStore, value => $$invalidate(13, $nodeEditStore = value));
    	validate_store(deleteNodes, 'deleteNodes');
    	component_subscribe($$self, deleteNodes, value => $$invalidate(14, $deleteNodes = value));

    	// $nodeSelected is a store boolean that lets GraphView component know if ANY node is selected
    	// moving local boolean specific to node selected, to change position of individual node once selected
    	let moving = false;

    	let moved = false;
    	let label;

    	const showEditModal = (e, node) => {
    		e.preventDefault();
    		set_store_value(nodeIdSelected, $nodeIdSelected = node.id, $nodeIdSelected);
    		const input = document.querySelector('.edit-modal');
    		input.style.display = 'flex';
    	};

    	afterUpdate(e => {
    		if (node.className) {
    			const [width, height, innerText] = getStyles(e, node);
    			$$invalidate(4, nodeWidth = width);
    			$$invalidate(5, nodeHeight = height);
    			$$invalidate(3, customCssText = innerText);
    		}
    	});

    	$$self.$$.on_mount.push(function () {
    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<Nodes> was created without expected prop 'node'");
    		}

    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<Nodes> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['node', 'key'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nodes> was created with unknown prop '${key}'`);
    	});

    	const mousemove_handler = e => {
    		e.preventDefault();

    		if (shouldMove && !$isLocked) {
    			onNodeMove(e, node.id);
    			$$invalidate(6, moved = true);
    		}
    	};

    	const mouseup_handler = e => {
    		// Note: mouseup moved outside of div to prevent issue where node becomes magnetized to cursor after leaving visible boundaries, github issues #120 & #125
    		if ($snapgrid) {
    			// If user sets snap attribute as true inside Svelvet
    			$$invalidate(0, node.position.x = Math.floor(node.position.x / $snapResize) * $snapResize, node);

    			$$invalidate(0, node.position.y = Math.floor(node.position.y / $snapResize) * $snapResize, node);

    			// Invoking on mouseMove so that edges update relation to node immediately upon snap 
    			onNodeMove(e, node.id);
    		}

    		$$invalidate(2, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);

    		// if (!moved && node.id == $nodeIdSelected) {
    		//   onNodeClick(e, node.id);
    		// }
    		$$invalidate(6, moved = false);
    	};

    	const mouseup_handler_1 = e => {
    		if (!moved && node.id == $nodeIdSelected) {
    			onNodeClick(e, node.id);
    		}
    	};

    	const contextmenu_handler = e => {
    		if ($nodeEditStore) showEditModal(e, node);
    	};

    	const touchmove_handler = e => {
    		if (shouldMove) {
    			onTouchMove(e, node.id);
    		}
    	};

    	const touchstart_handler = e => {
    		e.preventDefault();
    		$$invalidate(2, moving = true);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	const touchend_handler = e => {
    		$$invalidate(2, moving = false);
    		set_store_value(nodeSelected, $nodeSelected = false, $nodeSelected);
    	};

    	const mousedown_handler = e => {
    		e.preventDefault();
    		$$invalidate(2, moving = true);
    		set_store_value(nodeIdSelected, $nodeIdSelected = node.id, $nodeIdSelected);
    		set_store_value(nodeSelected, $nodeSelected = true, $nodeSelected);
    	};

    	$$self.$$set = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(28, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		afterUpdate,
    		EdgeAnchor,
    		DeleteAnchor,
    		node,
    		key,
    		customCssText,
    		nodeWidth,
    		nodeHeight,
    		onNodeMove,
    		onNodeClick,
    		onTouchMove,
    		getStyles,
    		nodeSelected,
    		nodeIdSelected,
    		movementStore,
    		snapgrid,
    		snapResize,
    		isLocked,
    		nodeEditStore,
    		deleteNodes,
    		moving,
    		moved,
    		label,
    		showEditModal,
    		shouldMove,
    		$nodeIdSelected,
    		$movementStore,
    		$isLocked,
    		$snapgrid,
    		$snapResize,
    		$nodeSelected,
    		$nodeEditStore,
    		$deleteNodes
    	});

    	$$self.$inject_state = $$props => {
    		if ('node' in $$props) $$invalidate(0, node = $$props.node);
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    		if ('customCssText' in $$props) $$invalidate(3, customCssText = $$props.customCssText);
    		if ('nodeWidth' in $$props) $$invalidate(4, nodeWidth = $$props.nodeWidth);
    		if ('nodeHeight' in $$props) $$invalidate(5, nodeHeight = $$props.nodeHeight);
    		if ('moving' in $$props) $$invalidate(2, moving = $$props.moving);
    		if ('moved' in $$props) $$invalidate(6, moved = $$props.moved);
    		if ('label' in $$props) label = $$props.label;
    		if ('shouldMove' in $$props) $$invalidate(7, shouldMove = $$props.shouldMove);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*moving, $movementStore*/ 134217732) {
    			$$invalidate(7, shouldMove = moving && $movementStore);
    		}

    		if ($$self.$$.dirty[0] & /*node*/ 1) {
    			label = node.data.label;
    		}
    	};

    	return [
    		node,
    		key,
    		moving,
    		customCssText,
    		nodeWidth,
    		nodeHeight,
    		moved,
    		shouldMove,
    		$nodeIdSelected,
    		$isLocked,
    		$snapgrid,
    		$snapResize,
    		$nodeSelected,
    		$nodeEditStore,
    		$deleteNodes,
    		onNodeMove,
    		onNodeClick,
    		onTouchMove,
    		nodeSelected,
    		nodeIdSelected,
    		movementStore,
    		snapgrid,
    		snapResize,
    		isLocked,
    		nodeEditStore,
    		deleteNodes,
    		showEditModal,
    		$movementStore,
    		$$scope,
    		slots,
    		mousemove_handler,
    		mouseup_handler,
    		mouseup_handler_1,
    		contextmenu_handler,
    		touchmove_handler,
    		touchstart_handler,
    		touchend_handler,
    		mousedown_handler
    	];
    }

    class Nodes extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { node: 0, key: 1 }, null, [-1, -1]);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nodes",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get node() {
    		throw new Error("<Nodes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<Nodes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Nodes>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Nodes>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Minimap/GreyNodeBoundary.svelte generated by Svelte v3.55.1 */

    const file$5 = "node_modules/svelvet/Containers/Minimap/GreyNodeBoundary.svelte";

    function create_fragment$5(ctx) {
    	let div;
    	let div_class_value;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "class", div_class_value = "nodes nodes-" + /*key*/ ctx[0] + " svelte-1rvz19b");
    			set_style(div, "top", /*top*/ ctx[1] + "px");
    			set_style(div, "left", /*left*/ ctx[2] + "px");
    			set_style(div, "height", /*nHeight*/ ctx[4] + "px");
    			set_style(div, "width", /*nWidth*/ ctx[3] + "px");
    			add_location(div, file$5, 21, 0, 493);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*key*/ 1 && div_class_value !== (div_class_value = "nodes nodes-" + /*key*/ ctx[0] + " svelte-1rvz19b")) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*top*/ 2) {
    				set_style(div, "top", /*top*/ ctx[1] + "px");
    			}

    			if (dirty & /*left*/ 4) {
    				set_style(div, "left", /*left*/ ctx[2] + "px");
    			}

    			if (dirty & /*nHeight*/ 16) {
    				set_style(div, "height", /*nHeight*/ ctx[4] + "px");
    			}

    			if (dirty & /*nWidth*/ 8) {
    				set_style(div, "width", /*nWidth*/ ctx[3] + "px");
    			}
    		},
    		i: noop$1,
    		o: noop$1,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GreyNodeBoundary', slots, []);
    	let { key } = $$props;
    	let { node } = $$props;
    	let { heightRatio } = $$props;
    	let { widthRatio } = $$props;
    	let top = 0;
    	let left = 0;
    	let nWidth = 0;
    	let nHeight = 0;

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<GreyNodeBoundary> was created without expected prop 'key'");
    		}

    		if (node === undefined && !('node' in $$props || $$self.$$.bound[$$self.$$.props['node']])) {
    			console.warn("<GreyNodeBoundary> was created without expected prop 'node'");
    		}

    		if (heightRatio === undefined && !('heightRatio' in $$props || $$self.$$.bound[$$self.$$.props['heightRatio']])) {
    			console.warn("<GreyNodeBoundary> was created without expected prop 'heightRatio'");
    		}

    		if (widthRatio === undefined && !('widthRatio' in $$props || $$self.$$.bound[$$self.$$.props['widthRatio']])) {
    			console.warn("<GreyNodeBoundary> was created without expected prop 'widthRatio'");
    		}
    	});

    	const writable_props = ['key', 'node', 'heightRatio', 'widthRatio'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GreyNodeBoundary> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('node' in $$props) $$invalidate(5, node = $$props.node);
    		if ('heightRatio' in $$props) $$invalidate(6, heightRatio = $$props.heightRatio);
    		if ('widthRatio' in $$props) $$invalidate(7, widthRatio = $$props.widthRatio);
    	};

    	$$self.$capture_state = () => ({
    		key,
    		node,
    		heightRatio,
    		widthRatio,
    		top,
    		left,
    		nWidth,
    		nHeight
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('node' in $$props) $$invalidate(5, node = $$props.node);
    		if ('heightRatio' in $$props) $$invalidate(6, heightRatio = $$props.heightRatio);
    		if ('widthRatio' in $$props) $$invalidate(7, widthRatio = $$props.widthRatio);
    		if ('top' in $$props) $$invalidate(1, top = $$props.top);
    		if ('left' in $$props) $$invalidate(2, left = $$props.left);
    		if ('nWidth' in $$props) $$invalidate(3, nWidth = $$props.nWidth);
    		if ('nHeight' in $$props) $$invalidate(4, nHeight = $$props.nHeight);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*node, heightRatio, widthRatio*/ 224) {
    			// sets the size and position of minimap greynodes based on corresponding nodes
    			{
    				$$invalidate(4, nHeight = Math.max(node.height * heightRatio, 5));
    				$$invalidate(3, nWidth = Math.max(node.width * widthRatio, 5));
    				$$invalidate(1, top = node.position.y * heightRatio);
    				$$invalidate(2, left = node.position.x * widthRatio);
    			}
    		}
    	};

    	return [key, top, left, nWidth, nHeight, node, heightRatio, widthRatio];
    }

    class GreyNodeBoundary extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, {
    			key: 0,
    			node: 5,
    			heightRatio: 6,
    			widthRatio: 7
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GreyNodeBoundary",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get key() {
    		throw new Error("<GreyNodeBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<GreyNodeBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get node() {
    		throw new Error("<GreyNodeBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set node(value) {
    		throw new Error("<GreyNodeBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get heightRatio() {
    		throw new Error("<GreyNodeBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set heightRatio(value) {
    		throw new Error("<GreyNodeBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get widthRatio() {
    		throw new Error("<GreyNodeBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set widthRatio(value) {
    		throw new Error("<GreyNodeBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Minimap/MinimapBoundary.svelte generated by Svelte v3.55.1 */
    const file$4 = "node_modules/svelvet/Containers/Minimap/MinimapBoundary.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[21] = list[i];
    	return child_ctx;
    }

    // (58:8) {#each $nodesStore as node}
    function create_each_block$3(ctx) {
    	let greynode;
    	let current;

    	greynode = new GreyNodeBoundary({
    			props: {
    				node: /*node*/ ctx[21],
    				key: /*key*/ ctx[0],
    				heightRatio: /*heightRatio*/ ctx[5],
    				widthRatio: /*widthRatio*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(greynode.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(greynode, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const greynode_changes = {};
    			if (dirty & /*$nodesStore*/ 2048) greynode_changes.node = /*node*/ ctx[21];
    			if (dirty & /*key*/ 1) greynode_changes.key = /*key*/ ctx[0];
    			if (dirty & /*heightRatio*/ 32) greynode_changes.heightRatio = /*heightRatio*/ ctx[5];
    			if (dirty & /*widthRatio*/ 16) greynode_changes.widthRatio = /*widthRatio*/ ctx[4];
    			greynode.$set(greynode_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(greynode.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(greynode.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(greynode, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(58:8) {#each $nodesStore as node}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let div1;
    	let div0;
    	let div0_class_value;
    	let t;
    	let div1_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*$nodesStore*/ ctx[11];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div0, "class", div0_class_value = "viewBox viewBox-" + /*key*/ ctx[0] + " svelte-1hwr1xr");
    			set_style(div0, "height", /*$heightStore*/ ctx[9] * /*heightRatio*/ ctx[5] / /*d3Translate*/ ctx[1].k + "px");
    			set_style(div0, "width", /*$widthStore*/ ctx[10] * /*widthRatio*/ ctx[4] / /*d3Translate*/ ctx[1].k + "px");
    			set_style(div0, "top", /*viewBottom*/ ctx[7] + "px");
    			set_style(div0, "left", /*viewRight*/ ctx[6] + "px");
    			add_location(div0, file$4, 56, 8, 1877);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`miniMap miniMap-${/*key*/ ctx[0]}`) + " svelte-1hwr1xr"));
    			set_style(div1, "height", /*mapHeight*/ ctx[2] + 2 + "px");
    			set_style(div1, "width", /*mapWidth*/ ctx[3] + 2 + "px");
    			add_location(div1, file$4, 55, 4, 1709);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div1, t);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			/*div1_binding*/ ctx[17](div1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "click", /*handleClick*/ ctx[15], false, false, false),
    					listen_dev(div1, "keydown", keydown_handler$1, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*key*/ 1 && div0_class_value !== (div0_class_value = "viewBox viewBox-" + /*key*/ ctx[0] + " svelte-1hwr1xr")) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty & /*$heightStore, heightRatio, d3Translate*/ 546) {
    				set_style(div0, "height", /*$heightStore*/ ctx[9] * /*heightRatio*/ ctx[5] / /*d3Translate*/ ctx[1].k + "px");
    			}

    			if (!current || dirty & /*$widthStore, widthRatio, d3Translate*/ 1042) {
    				set_style(div0, "width", /*$widthStore*/ ctx[10] * /*widthRatio*/ ctx[4] / /*d3Translate*/ ctx[1].k + "px");
    			}

    			if (!current || dirty & /*viewBottom*/ 128) {
    				set_style(div0, "top", /*viewBottom*/ ctx[7] + "px");
    			}

    			if (!current || dirty & /*viewRight*/ 64) {
    				set_style(div0, "left", /*viewRight*/ ctx[6] + "px");
    			}

    			if (dirty & /*$nodesStore, key, heightRatio, widthRatio*/ 2097) {
    				each_value = /*$nodesStore*/ ctx[11];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*key*/ 1 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`miniMap miniMap-${/*key*/ ctx[0]}`) + " svelte-1hwr1xr"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty & /*mapHeight*/ 4) {
    				set_style(div1, "height", /*mapHeight*/ ctx[2] + 2 + "px");
    			}

    			if (!current || dirty & /*mapWidth*/ 8) {
    				set_style(div1, "width", /*mapWidth*/ ctx[3] + 2 + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			/*div1_binding*/ ctx[17](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const keydown_handler$1 = () => {
    	return;
    };

    function instance$4($$self, $$props, $$invalidate) {
    	let $heightStore;
    	let $widthStore;
    	let $nodesStore;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MinimapBoundary', slots, []);
    	let { key } = $$props;
    	let { boundary } = $$props;
    	let { d3Translate } = $$props;
    	const svelvetStore = findOrCreateStore(key);
    	const { nodesStore, heightStore, widthStore } = svelvetStore;
    	validate_store(nodesStore, 'nodesStore');
    	component_subscribe($$self, nodesStore, value => $$invalidate(11, $nodesStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(9, $heightStore = value));
    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(10, $widthStore = value));
    	const dispatch = createEventDispatcher(); // dispatch creates a message to be sent
    	let mapHeight = 100;
    	let mapWidth = 100;
    	let widthRatio = 1;
    	let heightRatio = 1;
    	let viewRight = 1;
    	let viewBottom = 1;
    	let map;
    	let hasBeenClicked = false;

    	function handleClick(event) {
    		if (!hasBeenClicked) {
    			hasBeenClicked = true;
    			let bounds = map.getBoundingClientRect();

    			dispatch('message', {
    				x: (event.clientX - bounds.left) / widthRatio,
    				y: (event.clientY - bounds.top) / heightRatio
    			});

    			setTimeout(
    				() => {
    					hasBeenClicked = false;
    				},
    				500
    			);
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<MinimapBoundary> was created without expected prop 'key'");
    		}

    		if (boundary === undefined && !('boundary' in $$props || $$self.$$.bound[$$self.$$.props['boundary']])) {
    			console.warn("<MinimapBoundary> was created without expected prop 'boundary'");
    		}

    		if (d3Translate === undefined && !('d3Translate' in $$props || $$self.$$.bound[$$self.$$.props['d3Translate']])) {
    			console.warn("<MinimapBoundary> was created without expected prop 'd3Translate'");
    		}
    	});

    	const writable_props = ['key', 'boundary', 'd3Translate'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MinimapBoundary> was created with unknown prop '${key}'`);
    	});

    	function div1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			map = $$value;
    			$$invalidate(8, map);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('boundary' in $$props) $$invalidate(16, boundary = $$props.boundary);
    		if ('d3Translate' in $$props) $$invalidate(1, d3Translate = $$props.d3Translate);
    	};

    	$$self.$capture_state = () => ({
    		findOrCreateStore,
    		onMount,
    		createEventDispatcher,
    		GreyNode: GreyNodeBoundary,
    		key,
    		boundary,
    		d3Translate,
    		svelvetStore,
    		nodesStore,
    		heightStore,
    		widthStore,
    		dispatch,
    		mapHeight,
    		mapWidth,
    		widthRatio,
    		heightRatio,
    		viewRight,
    		viewBottom,
    		map,
    		hasBeenClicked,
    		handleClick,
    		$heightStore,
    		$widthStore,
    		$nodesStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('boundary' in $$props) $$invalidate(16, boundary = $$props.boundary);
    		if ('d3Translate' in $$props) $$invalidate(1, d3Translate = $$props.d3Translate);
    		if ('mapHeight' in $$props) $$invalidate(2, mapHeight = $$props.mapHeight);
    		if ('mapWidth' in $$props) $$invalidate(3, mapWidth = $$props.mapWidth);
    		if ('widthRatio' in $$props) $$invalidate(4, widthRatio = $$props.widthRatio);
    		if ('heightRatio' in $$props) $$invalidate(5, heightRatio = $$props.heightRatio);
    		if ('viewRight' in $$props) $$invalidate(6, viewRight = $$props.viewRight);
    		if ('viewBottom' in $$props) $$invalidate(7, viewBottom = $$props.viewBottom);
    		if ('map' in $$props) $$invalidate(8, map = $$props.map);
    		if ('hasBeenClicked' in $$props) hasBeenClicked = $$props.hasBeenClicked;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*boundary, mapWidth, mapHeight, d3Translate, widthRatio, heightRatio*/ 65598) {
    			{
    				if (boundary.y > boundary.x) {
    					$$invalidate(2, mapHeight = 100);
    					$$invalidate(3, mapWidth = Math.max(boundary.x.toFixed(0) * 100 / boundary.y.toFixed(0), 25));
    				} else if (boundary.y < boundary.x) {
    					$$invalidate(3, mapWidth = 100);
    					$$invalidate(2, mapHeight = Math.max(boundary.y.toFixed(0) * 100 / boundary.x.toFixed(0), 25));
    				} else {
    					$$invalidate(2, mapHeight = 100);
    					$$invalidate(3, mapWidth = 100);
    				}

    				$$invalidate(4, widthRatio = mapWidth / boundary.x);
    				$$invalidate(5, heightRatio = mapHeight / boundary.y);
    				$$invalidate(6, viewRight = Math.abs(d3Translate.x * widthRatio / d3Translate.k));
    				$$invalidate(7, viewBottom = Math.abs(d3Translate.y * heightRatio / d3Translate.k));
    			}
    		}
    	};

    	return [
    		key,
    		d3Translate,
    		mapHeight,
    		mapWidth,
    		widthRatio,
    		heightRatio,
    		viewRight,
    		viewBottom,
    		map,
    		$heightStore,
    		$widthStore,
    		$nodesStore,
    		nodesStore,
    		heightStore,
    		widthStore,
    		handleClick,
    		boundary,
    		div1_binding
    	];
    }

    class MinimapBoundary extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { key: 0, boundary: 16, d3Translate: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MinimapBoundary",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get key() {
    		throw new Error("<MinimapBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<MinimapBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boundary() {
    		throw new Error("<MinimapBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boundary(value) {
    		throw new Error("<MinimapBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get d3Translate() {
    		throw new Error("<MinimapBoundary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set d3Translate(value) {
    		throw new Error("<MinimapBoundary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/GraphView/index.svelte generated by Svelte v3.55.1 */
    const file$3 = "node_modules/svelvet/Containers/GraphView/index.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[37] = list[i];
    	return child_ctx;
    }

    function get_each_context_1$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[40] = list[i];
    	return child_ctx;
    }

    // (224:21) 
    function create_if_block_8(ctx) {
    	let minimapboundless;
    	let current;

    	minimapboundless = new MinimapBoundless({
    			props: {
    				key: /*key*/ ctx[2],
    				d3Translate: /*d3Translate*/ ctx[5]
    			},
    			$$inline: true
    		});

    	minimapboundless.$on("message", /*miniMapClick*/ ctx[18]);

    	const block = {
    		c: function create() {
    			create_component(minimapboundless.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(minimapboundless, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const minimapboundless_changes = {};
    			if (dirty[0] & /*key*/ 4) minimapboundless_changes.key = /*key*/ ctx[2];
    			if (dirty[0] & /*d3Translate*/ 32) minimapboundless_changes.d3Translate = /*d3Translate*/ ctx[5];
    			minimapboundless.$set(minimapboundless_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(minimapboundless.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(minimapboundless.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(minimapboundless, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_8.name,
    		type: "if",
    		source: "(224:21) ",
    		ctx
    	});

    	return block;
    }

    // (222:2) {#if minimap && boundary}
    function create_if_block_7(ctx) {
    	let minimapboundary;
    	let current;

    	minimapboundary = new MinimapBoundary({
    			props: {
    				key: /*key*/ ctx[2],
    				boundary: /*boundary*/ ctx[4],
    				d3Translate: /*d3Translate*/ ctx[5]
    			},
    			$$inline: true
    		});

    	minimapboundary.$on("message", /*miniMapClick*/ ctx[18]);

    	const block = {
    		c: function create() {
    			create_component(minimapboundary.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(minimapboundary, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const minimapboundary_changes = {};
    			if (dirty[0] & /*key*/ 4) minimapboundary_changes.key = /*key*/ ctx[2];
    			if (dirty[0] & /*boundary*/ 16) minimapboundary_changes.boundary = /*boundary*/ ctx[4];
    			if (dirty[0] & /*d3Translate*/ 32) minimapboundary_changes.d3Translate = /*d3Translate*/ ctx[5];
    			minimapboundary.$set(minimapboundary_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(minimapboundary.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(minimapboundary.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(minimapboundary, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_7.name,
    		type: "if",
    		source: "(222:2) {#if minimap && boundary}",
    		ctx
    	});

    	return block;
    }

    // (239:8) {:else}
    function create_else_block_1(ctx) {
    	let node;
    	let current;

    	node = new Nodes({
    			props: {
    				node: /*node*/ ctx[40],
    				key: /*key*/ ctx[2],
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty[0] & /*$nodesStore*/ 256) node_changes.node = /*node*/ ctx[40];
    			if (dirty[0] & /*key*/ 4) node_changes.key = /*key*/ ctx[2];

    			if (dirty[0] & /*$nodesStore*/ 256 | dirty[1] & /*$$scope*/ 4096) {
    				node_changes.$$scope = { dirty, ctx };
    			}

    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(239:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (236:35) 
    function create_if_block_6(ctx) {
    	let node;
    	let current;

    	node = new Nodes({
    			props: {
    				node: /*node*/ ctx[40],
    				key: /*key*/ ctx[2],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty[0] & /*$nodesStore*/ 256) node_changes.node = /*node*/ ctx[40];
    			if (dirty[0] & /*key*/ 4) node_changes.key = /*key*/ ctx[2];

    			if (dirty[0] & /*$nodesStore*/ 256 | dirty[1] & /*$$scope*/ 4096) {
    				node_changes.$$scope = { dirty, ctx };
    			}

    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_6.name,
    		type: "if",
    		source: "(236:35) ",
    		ctx
    	});

    	return block;
    }

    // (233:8) {#if node.data.html}
    function create_if_block_5(ctx) {
    	let node;
    	let t;
    	let current;

    	node = new Nodes({
    			props: {
    				node: /*node*/ ctx[40],
    				key: /*key*/ ctx[2],
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(node.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			mount_component(node, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const node_changes = {};
    			if (dirty[0] & /*$nodesStore*/ 256) node_changes.node = /*node*/ ctx[40];
    			if (dirty[0] & /*key*/ 4) node_changes.key = /*key*/ ctx[2];

    			if (dirty[0] & /*$nodesStore*/ 256 | dirty[1] & /*$$scope*/ 4096) {
    				node_changes.$$scope = { dirty, ctx };
    			}

    			node.$set(node_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(node.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(node.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(node, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_5.name,
    		type: "if",
    		source: "(233:8) {#if node.data.html}",
    		ctx
    	});

    	return block;
    }

    // (240:10) <Node {node} {key} >
    function create_default_slot_2(ctx) {
    	let t_value = /*node*/ ctx[40].data.label + "";
    	let t;

    	const block = {
    		c: function create() {
    			t = text(t_value);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$nodesStore*/ 256 && t_value !== (t_value = /*node*/ ctx[40].data.label + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(240:10) <Node {node} {key} >",
    		ctx
    	});

    	return block;
    }

    // (238:10) <Node {node} {key} >
    function create_default_slot_1(ctx) {
    	let switch_instance;
    	let t;
    	let current;
    	var switch_value = /*node*/ ctx[40].data.custom;

    	function switch_props(ctx) {
    		return { $$inline: true };
    	}

    	if (switch_value) {
    		switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			t = space();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) mount_component(switch_instance, target, anchor);
    			insert_dev(target, t, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (switch_value !== (switch_value = /*node*/ ctx[40].data.custom)) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = construct_svelte_component_dev(switch_value, switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, t.parentNode, t);
    				} else {
    					switch_instance = null;
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (switch_instance) destroy_component(switch_instance, detaching);
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(238:10) <Node {node} {key} >",
    		ctx
    	});

    	return block;
    }

    // (234:10) <Node {node} {key} >
    function create_default_slot$1(ctx) {
    	let html_tag;
    	let raw_value = /*node*/ ctx[40].data.html + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty$1();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*$nodesStore*/ 256 && raw_value !== (raw_value = /*node*/ ctx[40].data.html + "")) html_tag.p(raw_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(234:10) <Node {node} {key} >",
    		ctx
    	});

    	return block;
    }

    // (231:6) {#each $nodesStore as node (node.id)}
    function create_each_block_1$1(key_2, ctx) {
    	let first;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_5, create_if_block_6, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type_1(ctx, dirty) {
    		if (/*node*/ ctx[40].data.html) return 0;
    		if (/*node*/ ctx[40].data.custom) return 1;
    		return 2;
    	}

    	current_block_type_index = select_block_type_1(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		key: key_2,
    		first: null,
    		c: function create() {
    			first = empty$1();
    			if_block.c();
    			if_block_anchor = empty$1();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_1(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1$1.name,
    		type: "each",
    		source: "(231:6) {#each $nodesStore as node (node.id)}",
    		ctx
    	});

    	return block;
    }

    // (267:4) {#if $backgroundStore}
    function create_if_block_4(ctx) {
    	let rect;

    	const block = {
    		c: function create() {
    			rect = svg_element("rect");
    			attr_dev(rect, "width", "100%");
    			attr_dev(rect, "height", "100%");
    			set_style(rect, "fill", "url(#background-" + /*key*/ ctx[2] + ")");
    			add_location(rect, file$3, 267, 6, 9929);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, rect, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*key*/ 4) {
    				set_style(rect, "fill", "url(#background-" + /*key*/ ctx[2] + ")");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(rect);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(267:4) {#if $backgroundStore}",
    		ctx
    	});

    	return block;
    }

    // (280:8) {:else}
    function create_else_block(ctx) {
    	let simplebezieredge;
    	let current;

    	simplebezieredge = new SimpleBezierEdge({
    			props: { edge: /*edge*/ ctx[37] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(simplebezieredge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(simplebezieredge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const simplebezieredge_changes = {};
    			if (dirty[0] & /*$derivedEdges*/ 128) simplebezieredge_changes.edge = /*edge*/ ctx[37];
    			simplebezieredge.$set(simplebezieredge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(simplebezieredge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(simplebezieredge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(simplebezieredge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(280:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (278:39) 
    function create_if_block_3(ctx) {
    	let stepedge;
    	let current;

    	stepedge = new StepEdge({
    			props: { edge: /*edge*/ ctx[37] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(stepedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const stepedge_changes = {};
    			if (dirty[0] & /*$derivedEdges*/ 128) stepedge_changes.edge = /*edge*/ ctx[37];
    			stepedge.$set(stepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(278:39) ",
    		ctx
    	});

    	return block;
    }

    // (276:45) 
    function create_if_block_2$1(ctx) {
    	let smoothstepedge;
    	let current;

    	smoothstepedge = new SmoothStepEdge({
    			props: { edge: /*edge*/ ctx[37] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(smoothstepedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(smoothstepedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const smoothstepedge_changes = {};
    			if (dirty[0] & /*$derivedEdges*/ 128) smoothstepedge_changes.edge = /*edge*/ ctx[37];
    			smoothstepedge.$set(smoothstepedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(smoothstepedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(smoothstepedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(smoothstepedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(276:45) ",
    		ctx
    	});

    	return block;
    }

    // (274:8) {#if edge.type === 'straight'}
    function create_if_block_1$1(ctx) {
    	let straightedge;
    	let current;

    	straightedge = new StraightEdge({
    			props: { edge: /*edge*/ ctx[37] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(straightedge.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(straightedge, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const straightedge_changes = {};
    			if (dirty[0] & /*$derivedEdges*/ 128) straightedge_changes.edge = /*edge*/ ctx[37];
    			straightedge.$set(straightedge_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(straightedge.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(straightedge.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(straightedge, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(274:8) {#if edge.type === 'straight'}",
    		ctx
    	});

    	return block;
    }

    // (273:6) {#each $derivedEdges as edge (edge.id)}
    function create_each_block$2(key_2, ctx) {
    	let first;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1$1, create_if_block_2$1, create_if_block_3, create_else_block];
    	const if_blocks = [];

    	function select_block_type_2(ctx, dirty) {
    		if (/*edge*/ ctx[37].type === 'straight') return 0;
    		if (/*edge*/ ctx[37].type === 'smoothstep') return 1;
    		if (/*edge*/ ctx[37].type === 'step') return 2;
    		return 3;
    	}

    	current_block_type_index = select_block_type_2(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		key: key_2,
    		first: null,
    		c: function create() {
    			first = empty$1();
    			if_block.c();
    			if_block_anchor = empty$1();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type_2(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(273:6) {#each $derivedEdges as edge (edge.id)}",
    		ctx
    	});

    	return block;
    }

    // (287:2) {#if $shareable}
    function create_if_block$1(ctx) {
    	let div;
    	let a;
    	let svg;
    	let g0;
    	let g2;
    	let path0;
    	let g1;
    	let polygon;
    	let path1;
    	let a_id_value;
    	let t0;
    	let input;
    	let t1;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			a = element("a");
    			svg = svg_element("svg");
    			g0 = svg_element("g");
    			g2 = svg_element("g");
    			path0 = svg_element("path");
    			g1 = svg_element("g");
    			polygon = svg_element("polygon");
    			path1 = svg_element("path");
    			t0 = space();
    			input = element("input");
    			t1 = space();
    			button = element("button");
    			button.textContent = "Upload";
    			attr_dev(g0, "id", "SVGRepo_bgCarrier");
    			attr_dev(g0, "stroke-width", "0");
    			add_location(g0, file$3, 289, 151, 10751);
    			attr_dev(path0, "d", "M0 0h48v48H0z");
    			attr_dev(path0, "fill", "none");
    			add_location(path0, file$3, 289, 227, 10827);
    			attr_dev(polygon, "points", "22,4 22,20 14,20 24,30 34,20 26,20 26,4 ");
    			add_location(polygon, file$3, 289, 289, 10889);
    			attr_dev(path1, "d", "M8,44h32c2.206,0,4-1.794,4-4V30h-4v10H8V30H4v10C4,42.206,5.794,44,8,44z");
    			add_location(path1, file$3, 289, 359, 10959);
    			attr_dev(g1, "id", "Shopicon");
    			add_location(g1, file$3, 289, 271, 10871);
    			attr_dev(g2, "id", "SVGRepo_iconCarrier");
    			add_location(g2, file$3, 289, 198, 10798);
    			attr_dev(svg, "id", "dwnldimg");
    			attr_dev(svg, "viewBox", "0 0 48 48");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "fill", "#000000");
    			attr_dev(svg, "class", "svelte-o9nwyq");
    			add_location(svg, file$3, 289, 62, 10662);
    			attr_dev(a, "id", a_id_value = "downloadState-" + /*key*/ ctx[2]);
    			attr_dev(a, "download", "svelvet-state.json");
    			attr_dev(a, "class", "svelte-o9nwyq");
    			add_location(a, file$3, 289, 4, 10604);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "id", "store-input");
    			attr_dev(input, "placeholder", "Paste JSON here");
    			attr_dev(input, "class", "svelte-o9nwyq");
    			add_location(input, file$3, 290, 4, 11073);
    			attr_dev(button, "id", "store-input-btn");
    			attr_dev(button, "class", "svelte-o9nwyq");
    			add_location(button, file$3, 291, 4, 11144);
    			attr_dev(div, "id", "export-import");
    			attr_dev(div, "class", "svelte-o9nwyq");
    			add_location(div, file$3, 288, 2, 10575);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, svg);
    			append_dev(svg, g0);
    			append_dev(svg, g2);
    			append_dev(g2, path0);
    			append_dev(g2, g1);
    			append_dev(g1, polygon);
    			append_dev(g1, path1);
    			append_dev(div, t0);
    			append_dev(div, input);
    			append_dev(div, t1);
    			append_dev(div, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*uploadStore*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*key*/ 4 && a_id_value !== (a_id_value = "downloadState-" + /*key*/ ctx[2])) {
    				attr_dev(a, "id", a_id_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(287:2) {#if $shareable}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div2;
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let editmodal;
    	let t1;
    	let div1;
    	let div0;
    	let each_blocks_1 = [];
    	let each0_lookup = new Map();
    	let div0_class_value;
    	let div1_class_value;
    	let t2;
    	let svg;
    	let defs;
    	let pattern;
    	let circle;
    	let pattern_id_value;
    	let g;
    	let each_blocks = [];
    	let each1_lookup = new Map();
    	let svg_class_value;
    	let svg_viewBox_value;
    	let t3;
    	let current;
    	let mounted;
    	let dispose;
    	const if_block_creators = [create_if_block_7, create_if_block_8];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*minimap*/ ctx[3] && /*boundary*/ ctx[4]) return 0;
    		if (/*minimap*/ ctx[3]) return 1;
    		return -1;
    	}

    	if (~(current_block_type_index = select_block_type(ctx))) {
    		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    	}

    	editmodal = new EditModal({
    			props: { key: /*key*/ ctx[2] },
    			$$inline: true
    		});

    	let each_value_1 = /*$nodesStore*/ ctx[8];
    	validate_each_argument(each_value_1);
    	const get_key = ctx => /*node*/ ctx[40].id;
    	validate_each_keys(ctx, each_value_1, get_each_context_1$1, get_key);

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		let child_ctx = get_each_context_1$1(ctx, each_value_1, i);
    		let key = get_key(child_ctx);
    		each0_lookup.set(key, each_blocks_1[i] = create_each_block_1$1(key, child_ctx));
    	}

    	let if_block1 = /*$backgroundStore*/ ctx[9] && create_if_block_4(ctx);
    	let each_value = /*$derivedEdges*/ ctx[7];
    	validate_each_argument(each_value);
    	const get_key_1 = ctx => /*edge*/ ctx[37].id;
    	validate_each_keys(ctx, each_value, get_each_context$2, get_key_1);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$2(ctx, each_value, i);
    		let key = get_key_1(child_ctx);
    		each1_lookup.set(key, each_blocks[i] = create_each_block$2(key, child_ctx));
    	}

    	let if_block2 = /*$shareable*/ ctx[6] && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			create_component(editmodal.$$.fragment);
    			t1 = space();
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			svg = svg_element("svg");
    			defs = svg_element("defs");
    			pattern = svg_element("pattern");
    			circle = svg_element("circle");
    			if (if_block1) if_block1.c();
    			g = svg_element("g");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div0, "class", div0_class_value = "" + (null_to_empty(`Node Node-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"));
    			add_location(div0, file$3, 229, 4, 8817);
    			attr_dev(div1, "class", div1_class_value = "" + (null_to_empty(`Nodes Nodes-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"));
    			add_location(div1, file$3, 227, 2, 8641);
    			attr_dev(circle, "id", "dot");
    			attr_dev(circle, "cx", gridSize / 2 - dotSize / 2);
    			attr_dev(circle, "cy", gridSize / 2 - dotSize / 2);
    			attr_dev(circle, "r", "0.5");
    			set_style(circle, "fill", "gray");
    			add_location(circle, file$3, 256, 8, 9697);
    			attr_dev(pattern, "id", pattern_id_value = `background-${/*key*/ ctx[2]}`);
    			attr_dev(pattern, "x", "0");
    			attr_dev(pattern, "y", "0");
    			attr_dev(pattern, "width", gridSize);
    			attr_dev(pattern, "height", gridSize);
    			attr_dev(pattern, "patternUnits", "userSpaceOnUse");
    			attr_dev(pattern, "class", "svelte-o9nwyq");
    			add_location(pattern, file$3, 248, 6, 9522);
    			add_location(defs, file$3, 247, 4, 9509);
    			add_location(g, file$3, 271, 4, 10112);
    			attr_dev(svg, "class", svg_class_value = "" + (null_to_empty(`Edges Edges-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"));
    			attr_dev(svg, "viewBox", svg_viewBox_value = "0 0 " + /*$widthStore*/ ctx[10] + " " + /*$heightStore*/ ctx[11]);
    			add_location(svg, file$3, 246, 2, 9426);
    			attr_dev(div2, "id", "graphview-container");
    			attr_dev(div2, "class", "svelte-o9nwyq");
    			add_location(div2, file$3, 219, 0, 8247);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].m(div2, null);
    			}

    			append_dev(div2, t0);
    			mount_component(editmodal, div2, null);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div0, null);
    			}

    			append_dev(div2, t2);
    			append_dev(div2, svg);
    			append_dev(svg, defs);
    			append_dev(defs, pattern);
    			append_dev(pattern, circle);
    			if (if_block1) if_block1.m(svg, null);
    			append_dev(svg, g);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(g, null);
    			}

    			append_dev(div2, t3);
    			if (if_block2) if_block2.m(div2, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div1, "contextmenu", prevent_default(/*contextmenu_handler*/ ctx[25]), false, true, false),
    					listen_dev(div1, "click", /*closeEditModal*/ ctx[20], false, false, false),
    					listen_dev(div1, "keydown", keydown_handler, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if (~current_block_type_index) {
    					if_blocks[current_block_type_index].p(ctx, dirty);
    				}
    			} else {
    				if (if_block0) {
    					group_outros();

    					transition_out(if_blocks[previous_block_index], 1, 1, () => {
    						if_blocks[previous_block_index] = null;
    					});

    					check_outros();
    				}

    				if (~current_block_type_index) {
    					if_block0 = if_blocks[current_block_type_index];

    					if (!if_block0) {
    						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    						if_block0.c();
    					} else {
    						if_block0.p(ctx, dirty);
    					}

    					transition_in(if_block0, 1);
    					if_block0.m(div2, t0);
    				} else {
    					if_block0 = null;
    				}
    			}

    			const editmodal_changes = {};
    			if (dirty[0] & /*key*/ 4) editmodal_changes.key = /*key*/ ctx[2];
    			editmodal.$set(editmodal_changes);

    			if (dirty[0] & /*$nodesStore, key*/ 260) {
    				each_value_1 = /*$nodesStore*/ ctx[8];
    				validate_each_argument(each_value_1);
    				group_outros();
    				validate_each_keys(ctx, each_value_1, get_each_context_1$1, get_key);
    				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, div0, outro_and_destroy_block, create_each_block_1$1, null, get_each_context_1$1);
    				check_outros();
    			}

    			if (!current || dirty[0] & /*key*/ 4 && div0_class_value !== (div0_class_value = "" + (null_to_empty(`Node Node-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"))) {
    				attr_dev(div0, "class", div0_class_value);
    			}

    			if (!current || dirty[0] & /*key*/ 4 && div1_class_value !== (div1_class_value = "" + (null_to_empty(`Nodes Nodes-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"))) {
    				attr_dev(div1, "class", div1_class_value);
    			}

    			if (!current || dirty[0] & /*key*/ 4 && pattern_id_value !== (pattern_id_value = `background-${/*key*/ ctx[2]}`)) {
    				attr_dev(pattern, "id", pattern_id_value);
    			}

    			if (/*$backgroundStore*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_4(ctx);
    					if_block1.c();
    					if_block1.m(svg, g);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty[0] & /*$derivedEdges*/ 128) {
    				each_value = /*$derivedEdges*/ ctx[7];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context$2, get_key_1);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value, each1_lookup, g, outro_and_destroy_block, create_each_block$2, null, get_each_context$2);
    				check_outros();
    			}

    			if (!current || dirty[0] & /*key*/ 4 && svg_class_value !== (svg_class_value = "" + (null_to_empty(`Edges Edges-${/*key*/ ctx[2]}`) + " svelte-o9nwyq"))) {
    				attr_dev(svg, "class", svg_class_value);
    			}

    			if (!current || dirty[0] & /*$widthStore, $heightStore*/ 3072 && svg_viewBox_value !== (svg_viewBox_value = "0 0 " + /*$widthStore*/ ctx[10] + " " + /*$heightStore*/ ctx[11])) {
    				attr_dev(svg, "viewBox", svg_viewBox_value);
    			}

    			if (/*$shareable*/ ctx[6]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);
    				} else {
    					if_block2 = create_if_block$1(ctx);
    					if_block2.c();
    					if_block2.m(div2, null);
    				}
    			} else if (if_block2) {
    				if_block2.d(1);
    				if_block2 = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(editmodal.$$.fragment, local);

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(editmodal.$$.fragment, local);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);

    			if (~current_block_type_index) {
    				if_blocks[current_block_type_index].d();
    			}

    			destroy_component(editmodal);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].d();
    			}

    			if (if_block1) if_block1.d();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			if (if_block2) if_block2.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const gridSize = 15;
    const dotSize = 10;

    const keydown_handler = () => {
    	return;
    };

    function instance$3($$self, $$props, $$invalidate) {
    	let $shareable;

    	let $derivedEdges,
    		$$unsubscribe_derivedEdges = noop$1,
    		$$subscribe_derivedEdges = () => ($$unsubscribe_derivedEdges(), $$unsubscribe_derivedEdges = subscribe(derivedEdges, $$value => $$invalidate(7, $derivedEdges = $$value)), derivedEdges);

    	let $nodesStore,
    		$$unsubscribe_nodesStore = noop$1,
    		$$subscribe_nodesStore = () => ($$unsubscribe_nodesStore(), $$unsubscribe_nodesStore = subscribe(nodesStore, $$value => $$invalidate(8, $nodesStore = $$value)), nodesStore);

    	let $backgroundStore;
    	let $movementStore;
    	let $nodeSelected;
    	let $widthStore;
    	let $heightStore;
    	$$self.$$.on_destroy.push(() => $$unsubscribe_derivedEdges());
    	$$self.$$.on_destroy.push(() => $$unsubscribe_nodesStore());
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GraphView', slots, []);

    	let d3 = {
    		zoom,
    		zoomTransform: transform,
    		zoomIdentity: identity,
    		select,
    		selectAll,
    		pointer
    	};

    	let { nodesStore } = $$props;
    	validate_store(nodesStore, 'nodesStore');
    	$$subscribe_nodesStore();
    	let { derivedEdges } = $$props;
    	validate_store(derivedEdges, 'derivedEdges');
    	$$subscribe_derivedEdges();
    	let { key } = $$props;
    	let { initialZoom } = $$props;
    	let { initialLocation } = $$props;
    	let { minimap } = $$props;
    	let { width } = $$props;
    	let { height } = $$props;
    	let { boundary } = $$props;

    	// here we lookup the store using the unique key
    	const svelvetStore = findOrCreateStore(key);

    	// svelvetStore.isLocked.set(true)
    	const { nodeSelected, backgroundStore, movementStore, widthStore, heightStore, d3Scale, isLocked, shareable } = svelvetStore;

    	validate_store(nodeSelected, 'nodeSelected');
    	component_subscribe($$self, nodeSelected, value => $$invalidate(27, $nodeSelected = value));
    	validate_store(backgroundStore, 'backgroundStore');
    	component_subscribe($$self, backgroundStore, value => $$invalidate(9, $backgroundStore = value));
    	validate_store(movementStore, 'movementStore');
    	component_subscribe($$self, movementStore, value => $$invalidate(26, $movementStore = value));
    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(10, $widthStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(11, $heightStore = value));
    	validate_store(shareable, 'shareable');
    	component_subscribe($$self, shareable, value => $$invalidate(6, $shareable = value));

    	// declare prop to be passed down to the minimap
    	let d3Translate = { x: 0, y: 0, k: 1 };

    	//creating function to pass down
    	// handles case for when minimap sends message back to initiate translation event (click to traverse minimap)
    	// moves camera to the clicked node
    	function miniMapClick(event) {
    		// onclick in case of boundless minimap
    		if (!boundary) {
    			// For edges
    			d3.select(`.Edges-${key}`).transition().duration(500).call(d3Zoom.translateTo, event.detail.x, event.detail.y);

    			// For nodes
    			d3.select(`.Nodes-${key}`).transition().duration(500).call(d3Zoom.translateTo, event.detail.x, event.detail.y);
    		} else // handles case for when minimap has a boundary
    		{
    			// For edges
    			d3.select(`.Edges-${key}`).transition().duration(500).call(d3Zoom.translateTo, event.detail.x, event.detail.y);

    			// For nodes
    			d3.select(`.Nodes-${key}`).transition().duration(500).call(d3Zoom.translateTo, event.detail.x, event.detail.y);
    		}
    	}

    	// create d3 instance conditionally based on boundary prop
    	function determineD3Instance() {
    		if (boundary) {
    			return d3.zoom().filter(() => !$nodeSelected).scaleExtent([0.4, 2]).translateExtent([[0, 0], [boundary.x, boundary.y]]).extent([[0, 0], [width, height]]).on('zoom', handleZoom); // limits for zooming in/out
    			// world extent
    		} else {
    			return d3.zoom().filter(() => !$nodeSelected).scaleExtent([0.4, 2]).on('zoom', handleZoom);
    		}
    	}

    	let d3Zoom = determineD3Instance();

    	function zoomInit() {
    		//set default zoom logic
    		d3.select(`.Edges-${key}`).//makes sure translation is default at center coordinates
    		transition().duration(0).call(d3Zoom.translateTo, 0, 0).//moves camera to coordinates
    		transition().duration(0).call(d3Zoom.translateTo, initialLocation.x, initialLocation.y).// zooms in on selected point
    		transition().duration(0).call(d3Zoom.scaleBy, Number.parseFloat(.4 + .16 * initialZoom).toFixed(2));

    		// updates d3Translate with d3 object with x, y, and k values to be sent down to the minimap to be further calculated further
    		$$invalidate(5, d3Translate = d3.zoomIdentity.translate(initialLocation.x, initialLocation.y).scale(Number.parseFloat(.4 + .16 * initialZoom).toFixed(2)));

    		d3.select(`.Nodes-${key}`).transition().duration(0).call(d3Zoom.translateTo, 0, 0).transition().duration(0).call(d3Zoom.translateTo, initialLocation.x, initialLocation.y).transition().duration(0).call(d3Zoom.scaleBy, Number.parseFloat(.4 + .16 * initialZoom).toFixed(2));

    		// sets D3 scale to current k of object
    		d3Scale.set(d3.zoomTransform(d3.select(`.Nodes-${key}`)).k);
    	}

    	onMount(() => {
    		// actualizes the d3 instance
    		d3.select(`.Edges-${key}`).call(d3Zoom);

    		d3.select(`.Nodes-${key}`).call(d3Zoom);
    		d3.select(`#background-${key}`).call(d3Zoom);
    		d3.selectAll('#dot').call(d3Zoom);

    		//actualizes the initial zoom and pan
    		zoomInit();
    	});

    	//function that uploads a preexisting node diagram architecture
    	const uploadStore = e => {
    		//selects store-input 
    		const storeInput = document.getElementById('store-input');

    		//reviver function parses JSON string 
    		const reviver = (key, value) => {
    			//if node object has key of custom, evaluates and allows for custom components to be uploaded  
    			if (key === 'custom') return eval(value);

    			return value;
    		};

    		//grabs input field val
    		const text = storeInput.value;

    		const newStore = JSON.parse(text, reviver);

    		//sets nodes/edges from input 
    		svelvetStore.nodesStore.set(newStore.nodes);

    		svelvetStore.edgesStore.set(newStore.edges);

    		//resets input val to empty string
    		storeInput.value = '';
    	};

    	// TODO: Update d3Zoom type (refer to d3Zoom docs)
    	// function to handle zoom events - arguments: d3ZoomEvent
    	function handleZoom(e) {
    		if (!$movementStore) return;

    		//add a store that contains the current value of the d3-zoom's scale to be used in onMouseMove function
    		d3Scale.set(e.transform.k);

    		// should not run d3.select below if backgroundStore is false
    		if ($backgroundStore) {
    			d3.select(`#background-${key}`).attr('x', e.transform.x).attr('y', e.transform.y).attr('width', gridSize * e.transform.k).attr('height', gridSize * e.transform.k).selectAll('#dot').attr('x', gridSize * e.transform.k / 2 - dotSize / 2).attr('y', gridSize * e.transform.k / 2 - dotSize / 2).attr('opacity', Math.min(e.transform.k, 1));
    		}

    		// transform 'g' SVG elements (edge, edge text, edge anchor)
    		d3.select(`.Edges-${key} g`).attr('transform', e.transform);

    		// transform div elements (nodes)
    		let transform = d3.zoomTransform(this);

    		$$invalidate(5, d3Translate = transform);

    		// selects and transforms all node divs from class 'Node' and performs transformation
    		d3.select(`.Node-${key}`).style('transform', 'translate(' + transform.x + 'px,' + transform.y + 'px) scale(' + transform.k + ')').style('transform-origin', '0 0');
    	}

    	// closes the modal when you click outside of the modal
    	const closeEditModal = () => {
    		const input = document.querySelector(`.edit-modal-${key}`);
    		input.style.display = 'none';
    	};

    	// Can put afterUpdate functionality into it's own function. 
    	const setImportExport = () => {
    		function replacer(key, value) {
    			// Filtering out properties
    			if (key === 'custom') {
    				const str = value + '';
    				const arr = str.split(' ');
    				return arr[1];
    			}

    			return value;
    		}

    		// gets the current nodes and edges arrays from the store and saves them in an object
    		const state = { nodes: $nodesStore, edges: $derivedEdges };

    		// this function creates a data blob and an object URL for it
    		const makeTextFile = text => {
    			const data = new Blob([text], { type: 'application/json' });
    			const textFile = window.URL.createObjectURL(data);
    			return textFile;
    		};

    		// Set the download button target to the object URL
    		document.getElementById(`downloadState-${key}`).href = makeTextFile(JSON.stringify(state, replacer));
    	};

    	afterUpdate(() => {
    		if ($shareable) setImportExport();
    	});

    	$$self.$$.on_mount.push(function () {
    		if (nodesStore === undefined && !('nodesStore' in $$props || $$self.$$.bound[$$self.$$.props['nodesStore']])) {
    			console.warn("<GraphView> was created without expected prop 'nodesStore'");
    		}

    		if (derivedEdges === undefined && !('derivedEdges' in $$props || $$self.$$.bound[$$self.$$.props['derivedEdges']])) {
    			console.warn("<GraphView> was created without expected prop 'derivedEdges'");
    		}

    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<GraphView> was created without expected prop 'key'");
    		}

    		if (initialZoom === undefined && !('initialZoom' in $$props || $$self.$$.bound[$$self.$$.props['initialZoom']])) {
    			console.warn("<GraphView> was created without expected prop 'initialZoom'");
    		}

    		if (initialLocation === undefined && !('initialLocation' in $$props || $$self.$$.bound[$$self.$$.props['initialLocation']])) {
    			console.warn("<GraphView> was created without expected prop 'initialLocation'");
    		}

    		if (minimap === undefined && !('minimap' in $$props || $$self.$$.bound[$$self.$$.props['minimap']])) {
    			console.warn("<GraphView> was created without expected prop 'minimap'");
    		}

    		if (width === undefined && !('width' in $$props || $$self.$$.bound[$$self.$$.props['width']])) {
    			console.warn("<GraphView> was created without expected prop 'width'");
    		}

    		if (height === undefined && !('height' in $$props || $$self.$$.bound[$$self.$$.props['height']])) {
    			console.warn("<GraphView> was created without expected prop 'height'");
    		}

    		if (boundary === undefined && !('boundary' in $$props || $$self.$$.bound[$$self.$$.props['boundary']])) {
    			console.warn("<GraphView> was created without expected prop 'boundary'");
    		}
    	});

    	const writable_props = [
    		'nodesStore',
    		'derivedEdges',
    		'key',
    		'initialZoom',
    		'initialLocation',
    		'minimap',
    		'width',
    		'height',
    		'boundary'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GraphView> was created with unknown prop '${key}'`);
    	});

    	function contextmenu_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	$$self.$$set = $$props => {
    		if ('nodesStore' in $$props) $$subscribe_nodesStore($$invalidate(0, nodesStore = $$props.nodesStore));
    		if ('derivedEdges' in $$props) $$subscribe_derivedEdges($$invalidate(1, derivedEdges = $$props.derivedEdges));
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    		if ('initialZoom' in $$props) $$invalidate(21, initialZoom = $$props.initialZoom);
    		if ('initialLocation' in $$props) $$invalidate(22, initialLocation = $$props.initialLocation);
    		if ('minimap' in $$props) $$invalidate(3, minimap = $$props.minimap);
    		if ('width' in $$props) $$invalidate(23, width = $$props.width);
    		if ('height' in $$props) $$invalidate(24, height = $$props.height);
    		if ('boundary' in $$props) $$invalidate(4, boundary = $$props.boundary);
    	};

    	$$self.$capture_state = () => ({
    		afterUpdate,
    		onMount,
    		zoom,
    		zoomTransform: transform,
    		zoomIdentity: identity,
    		select,
    		selectAll,
    		pointer,
    		local,
    		SimpleBezierEdge,
    		StraightEdge,
    		SmoothStepEdge,
    		StepEdge,
    		EditModal,
    		MinimapBoundless,
    		Node: Nodes,
    		findOrCreateStore,
    		MinimapBoundary,
    		d3,
    		nodesStore,
    		derivedEdges,
    		key,
    		initialZoom,
    		initialLocation,
    		minimap,
    		width,
    		height,
    		boundary,
    		svelvetStore,
    		nodeSelected,
    		backgroundStore,
    		movementStore,
    		widthStore,
    		heightStore,
    		d3Scale,
    		isLocked,
    		shareable,
    		gridSize,
    		dotSize,
    		d3Translate,
    		miniMapClick,
    		determineD3Instance,
    		d3Zoom,
    		zoomInit,
    		uploadStore,
    		handleZoom,
    		closeEditModal,
    		setImportExport,
    		$shareable,
    		$derivedEdges,
    		$nodesStore,
    		$backgroundStore,
    		$movementStore,
    		$nodeSelected,
    		$widthStore,
    		$heightStore
    	});

    	$$self.$inject_state = $$props => {
    		if ('d3' in $$props) d3 = $$props.d3;
    		if ('nodesStore' in $$props) $$subscribe_nodesStore($$invalidate(0, nodesStore = $$props.nodesStore));
    		if ('derivedEdges' in $$props) $$subscribe_derivedEdges($$invalidate(1, derivedEdges = $$props.derivedEdges));
    		if ('key' in $$props) $$invalidate(2, key = $$props.key);
    		if ('initialZoom' in $$props) $$invalidate(21, initialZoom = $$props.initialZoom);
    		if ('initialLocation' in $$props) $$invalidate(22, initialLocation = $$props.initialLocation);
    		if ('minimap' in $$props) $$invalidate(3, minimap = $$props.minimap);
    		if ('width' in $$props) $$invalidate(23, width = $$props.width);
    		if ('height' in $$props) $$invalidate(24, height = $$props.height);
    		if ('boundary' in $$props) $$invalidate(4, boundary = $$props.boundary);
    		if ('d3Translate' in $$props) $$invalidate(5, d3Translate = $$props.d3Translate);
    		if ('d3Zoom' in $$props) d3Zoom = $$props.d3Zoom;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		nodesStore,
    		derivedEdges,
    		key,
    		minimap,
    		boundary,
    		d3Translate,
    		$shareable,
    		$derivedEdges,
    		$nodesStore,
    		$backgroundStore,
    		$widthStore,
    		$heightStore,
    		nodeSelected,
    		backgroundStore,
    		movementStore,
    		widthStore,
    		heightStore,
    		shareable,
    		miniMapClick,
    		uploadStore,
    		closeEditModal,
    		initialZoom,
    		initialLocation,
    		width,
    		height,
    		contextmenu_handler
    	];
    }

    class GraphView extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$3,
    			create_fragment$3,
    			safe_not_equal,
    			{
    				nodesStore: 0,
    				derivedEdges: 1,
    				key: 2,
    				initialZoom: 21,
    				initialLocation: 22,
    				minimap: 3,
    				width: 23,
    				height: 24,
    				boundary: 4
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GraphView",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get nodesStore() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodesStore(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get derivedEdges() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set derivedEdges(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get initialZoom() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialZoom(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get initialLocation() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialLocation(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get minimap() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set minimap(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boundary() {
    		throw new Error("<GraphView>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boundary(value) {
    		throw new Error("<GraphView>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules/svelvet/Containers/Svelvet/index.svelte generated by Svelte v3.55.1 */
    const file$2 = "node_modules/svelvet/Containers/Svelvet/index.svelte";

    function create_fragment$2(ctx) {
    	let div;
    	let graphview;
    	let div_style_value;
    	let current;

    	graphview = new GraphView({
    			props: {
    				nodesStore: /*nodesStore*/ ctx[12],
    				boundary: /*boundary*/ ctx[5],
    				width: /*width*/ ctx[0],
    				height: /*height*/ ctx[1],
    				minimap: /*minimap*/ ctx[4],
    				derivedEdges: /*derivedEdges*/ ctx[13],
    				key: /*key*/ ctx[9],
    				initialLocation: /*initialLocation*/ ctx[2],
    				initialZoom: /*initialZoom*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(graphview.$$.fragment);
    			attr_dev(div, "class", "Svelvet svelte-1gka45");
    			attr_dev(div, "style", div_style_value = `width: ${/*$widthStore*/ ctx[6]}px; height: ${/*$heightStore*/ ctx[7]}px; background-color: ${/*$backgroundColor*/ ctx[8]}`);
    			add_location(div, file$2, 79, 0, 3352);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(graphview, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const graphview_changes = {};
    			if (dirty & /*boundary*/ 32) graphview_changes.boundary = /*boundary*/ ctx[5];
    			if (dirty & /*width*/ 1) graphview_changes.width = /*width*/ ctx[0];
    			if (dirty & /*height*/ 2) graphview_changes.height = /*height*/ ctx[1];
    			if (dirty & /*minimap*/ 16) graphview_changes.minimap = /*minimap*/ ctx[4];
    			if (dirty & /*initialLocation*/ 4) graphview_changes.initialLocation = /*initialLocation*/ ctx[2];
    			if (dirty & /*initialZoom*/ 8) graphview_changes.initialZoom = /*initialZoom*/ ctx[3];
    			graphview.$set(graphview_changes);

    			if (!current || dirty & /*$widthStore, $heightStore, $backgroundColor*/ 448 && div_style_value !== (div_style_value = `width: ${/*$widthStore*/ ctx[6]}px; height: ${/*$heightStore*/ ctx[7]}px; background-color: ${/*$backgroundColor*/ ctx[8]}`)) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(graphview.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(graphview.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(graphview);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let $widthStore;
    	let $heightStore;
    	let $backgroundColor;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Svelvet', slots, []);
    	let { nodes } = $$props;
    	let { edges } = $$props;
    	let { width = 600 } = $$props;
    	let { height = 600 } = $$props;
    	let { background = false } = $$props;
    	let { nodeLink = false } = $$props;
    	let { nodeCreate = false } = $$props;
    	let { nodeEdit = false } = $$props;
    	let { movement = true } = $$props;
    	let { snap = false } = $$props;
    	let { snapTo = 30 } = $$props;
    	let { bgColor = '#ffffff' } = $$props;
    	let { initialLocation = { x: 0, y: 0 } } = $$props;
    	let { initialZoom = 4 } = $$props;
    	let { minimap = false } = $$props;
    	let { locked = false } = $$props;
    	let { boundary = false } = $$props;
    	let { shareable = false } = $$props;
    	let { deleteNodes = false } = $$props;

    	// generates a unique string for each svelvet component's unique store instance
    	const key = (Math.random() + 1).toString(36).substring(7);

    	// creates a store that uses the unique sting as the key to create and look up the corresponding store
    	// this way we can have multiple Svelvet Components on the same page and prevent overlap of information
    	const svelvetStore = findOrCreateStore(key);

    	// stores (state) within stores, so that we cannot access values from everywhere
    	const { widthStore, heightStore, nodesStore, derivedEdges, backgroundColor, isLocked } = svelvetStore;

    	validate_store(widthStore, 'widthStore');
    	component_subscribe($$self, widthStore, value => $$invalidate(6, $widthStore = value));
    	validate_store(heightStore, 'heightStore');
    	component_subscribe($$self, heightStore, value => $$invalidate(7, $heightStore = value));
    	validate_store(backgroundColor, 'backgroundColor');
    	component_subscribe($$self, backgroundColor, value => $$invalidate(8, $backgroundColor = value));

    	// sets the state of the store to the values passed in from the Svelvet Component on initial render
    	onMount(() => {
    		svelvetStore.nodesStore.set(nodes);
    		svelvetStore.edgesStore.set(edges);
    		svelvetStore.widthStore.set(width);
    		svelvetStore.heightStore.set(height);
    		svelvetStore.backgroundStore.set(background);
    		svelvetStore.movementStore.set(movement);
    		svelvetStore.snapgrid.set(snap);
    		svelvetStore.backgroundColor.set(bgColor);
    		svelvetStore.snapResize.set(snapTo);
    		svelvetStore.initZoom.set(initialZoom);
    		svelvetStore.initLocation.set(initialLocation);
    		svelvetStore.isLocked.set(locked);
    		svelvetStore.boundary.set(boundary);
    		svelvetStore.nodeLinkStore.set(nodeLink);
    		svelvetStore.nodeCreateStore.set(nodeCreate);
    		svelvetStore.nodeEditStore.set(nodeEdit);
    		svelvetStore.shareable.set(shareable);
    		svelvetStore.deleteNodes.set(deleteNodes);
    	});

    	afterUpdate(() => {
    		svelvetStore.nodesStore.set(nodes);
    		svelvetStore.edgesStore.set(edges);
    		svelvetStore.widthStore.set(width);
    		svelvetStore.heightStore.set(height);
    		svelvetStore.backgroundStore.set(background);
    		svelvetStore.movementStore.set(movement);
    		svelvetStore.snapgrid.set(snap);
    		svelvetStore.backgroundColor.set(bgColor);
    		svelvetStore.snapResize.set(snapTo);
    		svelvetStore.initZoom.set(initialZoom);
    		svelvetStore.initLocation.set(initialLocation);
    		svelvetStore.isLocked.set(locked);
    		svelvetStore.boundary.set(boundary);
    		svelvetStore.nodeLinkStore.set(nodeLink);
    		svelvetStore.nodeCreateStore.set(nodeCreate);
    		svelvetStore.nodeEditStore.set(nodeEdit);
    		svelvetStore.shareable.set(shareable);
    		svelvetStore.deleteNodes.set(deleteNodes);
    	});

    	$$self.$$.on_mount.push(function () {
    		if (nodes === undefined && !('nodes' in $$props || $$self.$$.bound[$$self.$$.props['nodes']])) {
    			console.warn("<Svelvet> was created without expected prop 'nodes'");
    		}

    		if (edges === undefined && !('edges' in $$props || $$self.$$.bound[$$self.$$.props['edges']])) {
    			console.warn("<Svelvet> was created without expected prop 'edges'");
    		}
    	});

    	const writable_props = [
    		'nodes',
    		'edges',
    		'width',
    		'height',
    		'background',
    		'nodeLink',
    		'nodeCreate',
    		'nodeEdit',
    		'movement',
    		'snap',
    		'snapTo',
    		'bgColor',
    		'initialLocation',
    		'initialZoom',
    		'minimap',
    		'locked',
    		'boundary',
    		'shareable',
    		'deleteNodes'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Svelvet> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('nodes' in $$props) $$invalidate(15, nodes = $$props.nodes);
    		if ('edges' in $$props) $$invalidate(16, edges = $$props.edges);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('background' in $$props) $$invalidate(17, background = $$props.background);
    		if ('nodeLink' in $$props) $$invalidate(18, nodeLink = $$props.nodeLink);
    		if ('nodeCreate' in $$props) $$invalidate(19, nodeCreate = $$props.nodeCreate);
    		if ('nodeEdit' in $$props) $$invalidate(20, nodeEdit = $$props.nodeEdit);
    		if ('movement' in $$props) $$invalidate(21, movement = $$props.movement);
    		if ('snap' in $$props) $$invalidate(22, snap = $$props.snap);
    		if ('snapTo' in $$props) $$invalidate(23, snapTo = $$props.snapTo);
    		if ('bgColor' in $$props) $$invalidate(24, bgColor = $$props.bgColor);
    		if ('initialLocation' in $$props) $$invalidate(2, initialLocation = $$props.initialLocation);
    		if ('initialZoom' in $$props) $$invalidate(3, initialZoom = $$props.initialZoom);
    		if ('minimap' in $$props) $$invalidate(4, minimap = $$props.minimap);
    		if ('locked' in $$props) $$invalidate(25, locked = $$props.locked);
    		if ('boundary' in $$props) $$invalidate(5, boundary = $$props.boundary);
    		if ('shareable' in $$props) $$invalidate(26, shareable = $$props.shareable);
    		if ('deleteNodes' in $$props) $$invalidate(27, deleteNodes = $$props.deleteNodes);
    	};

    	$$self.$capture_state = () => ({
    		GraphView,
    		findOrCreateStore,
    		onMount,
    		afterUpdate,
    		nodes,
    		edges,
    		width,
    		height,
    		background,
    		nodeLink,
    		nodeCreate,
    		nodeEdit,
    		movement,
    		snap,
    		snapTo,
    		bgColor,
    		initialLocation,
    		initialZoom,
    		minimap,
    		locked,
    		boundary,
    		shareable,
    		deleteNodes,
    		key,
    		svelvetStore,
    		widthStore,
    		heightStore,
    		nodesStore,
    		derivedEdges,
    		backgroundColor,
    		isLocked,
    		$widthStore,
    		$heightStore,
    		$backgroundColor
    	});

    	$$self.$inject_state = $$props => {
    		if ('nodes' in $$props) $$invalidate(15, nodes = $$props.nodes);
    		if ('edges' in $$props) $$invalidate(16, edges = $$props.edges);
    		if ('width' in $$props) $$invalidate(0, width = $$props.width);
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('background' in $$props) $$invalidate(17, background = $$props.background);
    		if ('nodeLink' in $$props) $$invalidate(18, nodeLink = $$props.nodeLink);
    		if ('nodeCreate' in $$props) $$invalidate(19, nodeCreate = $$props.nodeCreate);
    		if ('nodeEdit' in $$props) $$invalidate(20, nodeEdit = $$props.nodeEdit);
    		if ('movement' in $$props) $$invalidate(21, movement = $$props.movement);
    		if ('snap' in $$props) $$invalidate(22, snap = $$props.snap);
    		if ('snapTo' in $$props) $$invalidate(23, snapTo = $$props.snapTo);
    		if ('bgColor' in $$props) $$invalidate(24, bgColor = $$props.bgColor);
    		if ('initialLocation' in $$props) $$invalidate(2, initialLocation = $$props.initialLocation);
    		if ('initialZoom' in $$props) $$invalidate(3, initialZoom = $$props.initialZoom);
    		if ('minimap' in $$props) $$invalidate(4, minimap = $$props.minimap);
    		if ('locked' in $$props) $$invalidate(25, locked = $$props.locked);
    		if ('boundary' in $$props) $$invalidate(5, boundary = $$props.boundary);
    		if ('shareable' in $$props) $$invalidate(26, shareable = $$props.shareable);
    		if ('deleteNodes' in $$props) $$invalidate(27, deleteNodes = $$props.deleteNodes);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		width,
    		height,
    		initialLocation,
    		initialZoom,
    		minimap,
    		boundary,
    		$widthStore,
    		$heightStore,
    		$backgroundColor,
    		key,
    		widthStore,
    		heightStore,
    		nodesStore,
    		derivedEdges,
    		backgroundColor,
    		nodes,
    		edges,
    		background,
    		nodeLink,
    		nodeCreate,
    		nodeEdit,
    		movement,
    		snap,
    		snapTo,
    		bgColor,
    		locked,
    		shareable,
    		deleteNodes
    	];
    }

    class Svelvet extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			nodes: 15,
    			edges: 16,
    			width: 0,
    			height: 1,
    			background: 17,
    			nodeLink: 18,
    			nodeCreate: 19,
    			nodeEdit: 20,
    			movement: 21,
    			snap: 22,
    			snapTo: 23,
    			bgColor: 24,
    			initialLocation: 2,
    			initialZoom: 3,
    			minimap: 4,
    			locked: 25,
    			boundary: 5,
    			shareable: 26,
    			deleteNodes: 27
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Svelvet",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get nodes() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodes(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get edges() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set edges(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get width() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set width(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get height() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set height(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get background() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set background(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nodeLink() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodeLink(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nodeCreate() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodeCreate(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get nodeEdit() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set nodeEdit(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get movement() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set movement(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get snap() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set snap(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get snapTo() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set snapTo(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bgColor() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set bgColor(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get initialLocation() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialLocation(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get initialZoom() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set initialZoom(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get minimap() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set minimap(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get locked() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set locked(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get boundary() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set boundary(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shareable() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set shareable(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get deleteNodes() {
    		throw new Error("<Svelvet>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set deleteNodes(value) {
    		throw new Error("<Svelvet>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/routes/Evidence.svelte generated by Svelte v3.55.1 */

    const { console: console_1$1 } = globals;
    const file$1 = "src/routes/Evidence.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[5] = list[i];
    	return child_ctx;
    }

    // (61:16) {#if $graph !== null }
    function create_if_block_2(ctx) {
    	let each_1_anchor;
    	let each_value_1 = /*$graph*/ ctx[2].evidence;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$graph*/ 4) {
    				each_value_1 = /*$graph*/ ctx[2].evidence;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(61:16) {#if $graph !== null }",
    		ctx
    	});

    	return block;
    }

    // (62:16) {#each $graph.evidence as evidence}
    function create_each_block_1(ctx) {
    	let option;
    	let t_value = /*evidence*/ ctx[5].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*evidence*/ ctx[5].id;
    			option.value = option.__value;
    			add_location(option, file$1, 62, 20, 1609);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$graph*/ 4 && t_value !== (t_value = /*evidence*/ ctx[5].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$graph*/ 4 && option_value_value !== (option_value_value = /*evidence*/ ctx[5].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(62:16) {#each $graph.evidence as evidence}",
    		ctx
    	});

    	return block;
    }

    // (71:16) {#if $graph !== null }
    function create_if_block_1(ctx) {
    	let each_1_anchor;
    	let each_value = /*$graph*/ ctx[2].evidence;
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$graph*/ 4) {
    				each_value = /*$graph*/ ctx[2].evidence;
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(71:16) {#if $graph !== null }",
    		ctx
    	});

    	return block;
    }

    // (72:16) {#each $graph.evidence as evidence}
    function create_each_block$1(ctx) {
    	let option;
    	let t_value = /*evidence*/ ctx[5].name + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*evidence*/ ctx[5].id;
    			option.value = option.__value;
    			add_location(option, file$1, 72, 20, 1990);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*$graph*/ 4 && t_value !== (t_value = /*evidence*/ ctx[5].name + "")) set_data_dev(t, t_value);

    			if (dirty & /*$graph*/ 4 && option_value_value !== (option_value_value = /*evidence*/ ctx[5].id)) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(72:16) {#each $graph.evidence as evidence}",
    		ctx
    	});

    	return block;
    }

    // (80:4) {#if $initialNodes.length > 0}
    function create_if_block(ctx) {
    	let svelvet;
    	let current;

    	svelvet = new Svelvet({
    			props: {
    				nodes: /*$initialNodes*/ ctx[3],
    				edges: /*$initialEdges*/ ctx[4],
    				background: true
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(svelvet.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(svelvet, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const svelvet_changes = {};
    			if (dirty & /*$initialNodes*/ 8) svelvet_changes.nodes = /*$initialNodes*/ ctx[3];
    			if (dirty & /*$initialEdges*/ 16) svelvet_changes.edges = /*$initialEdges*/ ctx[4];
    			svelvet.$set(svelvet_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(svelvet.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(svelvet.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(svelvet, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(80:4) {#if $initialNodes.length > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let div3;
    	let label0;
    	let t1;
    	let input;
    	let t2;
    	let button0;
    	let t4;
    	let div2;
    	let div0;
    	let label1;
    	let t6;
    	let select0;
    	let t7;
    	let div1;
    	let label2;
    	let t9;
    	let select1;
    	let t10;
    	let button1;
    	let t12;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*$graph*/ ctx[2] !== null && create_if_block_2(ctx);
    	let if_block1 = /*$graph*/ ctx[2] !== null && create_if_block_1(ctx);
    	let if_block2 = /*$initialNodes*/ ctx[3].length > 0 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			label0 = element("label");
    			label0.textContent = "Evidence";
    			t1 = space();
    			input = element("input");
    			t2 = space();
    			button0 = element("button");
    			button0.textContent = "Submit";
    			t4 = space();
    			div2 = element("div");
    			div0 = element("div");
    			label1 = element("label");
    			label1.textContent = "Source";
    			t6 = space();
    			select0 = element("select");
    			if (if_block0) if_block0.c();
    			t7 = space();
    			div1 = element("div");
    			label2 = element("label");
    			label2.textContent = "Destination";
    			t9 = space();
    			select1 = element("select");
    			if (if_block1) if_block1.c();
    			t10 = space();
    			button1 = element("button");
    			button1.textContent = "Submit";
    			t12 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(label0, "for", "flag");
    			add_location(label0, file$1, 52, 4, 1201);
    			attr_dev(input, "id", "flag");
    			attr_dev(input, "type", "text");
    			add_location(input, file$1, 53, 4, 1240);
    			add_location(button0, file$1, 54, 4, 1298);
    			attr_dev(label1, "for", "source");
    			add_location(label1, file$1, 58, 12, 1410);
    			attr_dev(select0, "id", "source");
    			if (/*source*/ ctx[0] === void 0) add_render_callback(() => /*select0_change_handler*/ ctx[12].call(select0));
    			add_location(select0, file$1, 59, 12, 1457);
    			attr_dev(div0, "class", "svelte-wuju4v");
    			add_location(div0, file$1, 57, 8, 1392);
    			attr_dev(label2, "for", "destination");
    			add_location(label2, file$1, 68, 12, 1771);
    			attr_dev(select1, "id", "destination");
    			if (/*destination*/ ctx[1] === void 0) add_render_callback(() => /*select1_change_handler*/ ctx[13].call(select1));
    			add_location(select1, file$1, 69, 12, 1828);
    			attr_dev(div1, "class", "svelte-wuju4v");
    			add_location(div1, file$1, 67, 8, 1753);
    			attr_dev(div2, "class", "connection-input svelte-wuju4v");
    			add_location(div2, file$1, 56, 4, 1353);
    			add_location(button1, file$1, 78, 4, 2141);
    			add_location(div3, file$1, 51, 0, 1191);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, label0);
    			append_dev(div3, t1);
    			append_dev(div3, input);
    			set_input_value(input, /*evidence*/ ctx[5]);
    			append_dev(div3, t2);
    			append_dev(div3, button0);
    			append_dev(div3, t4);
    			append_dev(div3, div2);
    			append_dev(div2, div0);
    			append_dev(div0, label1);
    			append_dev(div0, t6);
    			append_dev(div0, select0);
    			if (if_block0) if_block0.m(select0, null);
    			select_option(select0, /*source*/ ctx[0]);
    			append_dev(div2, t7);
    			append_dev(div2, div1);
    			append_dev(div1, label2);
    			append_dev(div1, t9);
    			append_dev(div1, select1);
    			if (if_block1) if_block1.m(select1, null);
    			select_option(select1, /*destination*/ ctx[1]);
    			append_dev(div3, t10);
    			append_dev(div3, button1);
    			append_dev(div3, t12);
    			if (if_block2) if_block2.m(div3, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[11]),
    					listen_dev(button0, "click", /*submitEvidence*/ ctx[9], false, false, false),
    					listen_dev(select0, "change", /*select0_change_handler*/ ctx[12]),
    					listen_dev(select1, "change", /*select1_change_handler*/ ctx[13]),
    					listen_dev(button1, "click", /*submitConnection*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*evidence*/ 32 && input.value !== /*evidence*/ ctx[5]) {
    				set_input_value(input, /*evidence*/ ctx[5]);
    			}

    			if (/*$graph*/ ctx[2] !== null) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					if_block0.m(select0, null);
    				}
    			} else if (if_block0) {
    				if_block0.d(1);
    				if_block0 = null;
    			}

    			if (dirty & /*source, $graph*/ 5) {
    				select_option(select0, /*source*/ ctx[0]);
    			}

    			if (/*$graph*/ ctx[2] !== null) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1(ctx);
    					if_block1.c();
    					if_block1.m(select1, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (dirty & /*destination, $graph*/ 6) {
    				select_option(select1, /*destination*/ ctx[1]);
    			}

    			if (/*$initialNodes*/ ctx[3].length > 0) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*$initialNodes*/ 8) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div3, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $graph;
    	let $initialNodes;
    	let $initialEdges;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Evidence', slots, []);
    	let evidence = '';
    	let source = 0;
    	let destination = 0;
    	let graph = writable({ connections: [], evidence: [] });
    	validate_store(graph, 'graph');
    	component_subscribe($$self, graph, value => $$invalidate(2, $graph = value));

    	const initialNodes = derived(graph, $graph => $graph.evidence.map(e => ({
    		id: e.id,
    		data: { label: e.name },
    		position: { x: 100, y: 100 },
    		height: 100,
    		width: 100
    	})));

    	validate_store(initialNodes, 'initialNodes');
    	component_subscribe($$self, initialNodes, value => $$invalidate(3, $initialNodes = value));

    	const initialEdges = derived(graph, $graph => $graph.connections.map(c => ({
    		id: `${c.source}-${c.destination}`,
    		source: c.source,
    		target: c.destination
    	})));

    	validate_store(initialEdges, 'initialEdges');
    	component_subscribe($$self, initialEdges, value => $$invalidate(4, $initialEdges = value));

    	onMount(async () => {
    		try {
    			const resp = await ctfg.GetDiscoveredEvidence({});
    			graph.set(resp);
    		} catch(e) {
    			console.error(e);
    			return;
    		}
    	});

    	async function submitEvidence() {
    		const resp = await ctfg.SubmitEvidence({ evidence });
    		console.log(resp);
    	}

    	async function submitConnection() {
    		const resp = await ctfg.SubmitEvidenceConnection({ source, destination });
    		console.log(resp);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<Evidence> was created with unknown prop '${key}'`);
    	});

    	function input_input_handler() {
    		evidence = this.value;
    		$$invalidate(5, evidence);
    	}

    	function select0_change_handler() {
    		source = select_value(this);
    		$$invalidate(0, source);
    	}

    	function select1_change_handler() {
    		destination = select_value(this);
    		$$invalidate(1, destination);
    	}

    	$$self.$capture_state = () => ({
    		onMount,
    		ctfg,
    		Svelvet,
    		writable,
    		derived,
    		evidence,
    		source,
    		destination,
    		graph,
    		initialNodes,
    		initialEdges,
    		submitEvidence,
    		submitConnection,
    		$graph,
    		$initialNodes,
    		$initialEdges
    	});

    	$$self.$inject_state = $$props => {
    		if ('evidence' in $$props) $$invalidate(5, evidence = $$props.evidence);
    		if ('source' in $$props) $$invalidate(0, source = $$props.source);
    		if ('destination' in $$props) $$invalidate(1, destination = $$props.destination);
    		if ('graph' in $$props) $$invalidate(6, graph = $$props.graph);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		source,
    		destination,
    		$graph,
    		$initialNodes,
    		$initialEdges,
    		evidence,
    		graph,
    		initialNodes,
    		initialEdges,
    		submitEvidence,
    		submitConnection,
    		input_input_handler,
    		select0_change_handler,
    		select1_change_handler
    	];
    }

    class Evidence extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Evidence",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.55.1 */

    const { console: console_1 } = globals;
    const file = "src/App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[1] = list[i];
    	return child_ctx;
    }

    // (36:8) {#each links as link}
    function create_each_block(ctx) {
    	let route;
    	let current;

    	route = new Route({
    			props: {
    				path: /*link*/ ctx[1].to,
    				component: /*link*/ ctx[1].Component
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route, target, anchor);
    			current = true;
    		},
    		p: noop$1,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(36:8) {#each links as link}",
    		ctx
    	});

    	return block;
    }

    // (34:4) <Router>
    function create_default_slot(ctx) {
    	let navbar;
    	let t;
    	let each_1_anchor;
    	let current;

    	navbar = new Navbar({
    			props: { links: /*links*/ ctx[0] },
    			$$inline: true
    		});

    	let each_value = /*links*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			create_component(navbar.$$.fragment);
    			t = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty$1();
    		},
    		m: function mount(target, anchor) {
    			mount_component(navbar, target, anchor);
    			insert_dev(target, t, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*links*/ 1) {
    				each_value = /*links*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(navbar.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(navbar.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(navbar, detaching);
    			if (detaching) detach_dev(t);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(34:4) <Router>",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let main;
    	let router;
    	let current;

    	router = new Router({
    			props: {
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(router.$$.fragment);
    			add_location(main, file, 32, 0, 903);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);

    	onMount(async () => {
    		try {
    			const resp = await ctfg.CurrentUser({});
    			user.set({ username: resp.username });
    		} catch(e) {
    			console.error(e);
    		}
    	});

    	const links = [
    		{ label: "Home", to: "/", Component: Home },
    		{
    			label: "Evidence",
    			to: "/evidence",
    			Component: Evidence
    		},
    		{
    			label: "Login",
    			to: "/login",
    			Component: Login
    		},
    		{
    			label: "Register",
    			to: "/register",
    			Component: Register
    		}
    	];

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Router,
    		Route,
    		Navbar,
    		Login,
    		Register,
    		Home,
    		onMount,
    		ctfg,
    		user,
    		Evidence,
    		links
    	});

    	return [links];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
        target: document.body,
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
