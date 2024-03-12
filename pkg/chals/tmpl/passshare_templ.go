// Code generated by templ - DO NOT EDIT.

// templ: version: v0.2.543
package tmpl

//lint:file-ignore SA4006 This context is only used if a nested component is present.

import "github.com/a-h/templ"
import "context"
import "io"
import "bytes"

import (
	"github.com/xctf-io/xctf/pkg/gen/chalgen"
)

type PassShareState struct {
	BaseURL  string
	Password string
}

func lock(baseUrl string) templ.ComponentScript {
	return templ.ComponentScript{
		Name: `__templ_lock_7f8e`,
		Function: `function __templ_lock_7f8e(baseUrl){const lock = new PatternLock({
        $canvas: document.querySelector('#lock'),
        width: 300,
        height: 430,
        grid: [ 6, 8 ],
    });
    lock.onComplete(({ hash }) => {
        const id = parseInt(document.querySelector('#id').value);
        fetch(baseUrl + '/solve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hash, id }),
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert(` + "`" + `${data.flag} Password: ${data.password}` + "`" + `);
            } else {
                alert('Failed');
            }
        });

    });
}`,
		Call:       templ.SafeScript(`__templ_lock_7f8e`, baseUrl),
		CallInline: templ.SafeScriptInline(`__templ_lock_7f8e`, baseUrl),
	}
}

func PassShare(s PassShareState, ps *chalgen.PassShare) templ.Component {
	return templ.ComponentFunc(func(ctx context.Context, templ_7745c5c3_W io.Writer) (templ_7745c5c3_Err error) {
		templ_7745c5c3_Buffer, templ_7745c5c3_IsBuffer := templ_7745c5c3_W.(*bytes.Buffer)
		if !templ_7745c5c3_IsBuffer {
			templ_7745c5c3_Buffer = templ.GetBuffer()
			defer templ.ReleaseBuffer(templ_7745c5c3_Buffer)
		}
		ctx = templ.InitializeContext(ctx)
		templ_7745c5c3_Var1 := templ.GetChildren(ctx)
		if templ_7745c5c3_Var1 == nil {
			templ_7745c5c3_Var1 = templ.NopComponent
		}
		ctx = templ.ClearChildren(ctx)
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("<div><script src=\"/build/vanilla.example.js\"></script><h1>PassShare</h1><p>Share your password with a friend!</p><input id=\"id\" type=\"number\" name=\"id\" placeholder=\"id\"><canvas id=\"lock\"></canvas><p>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		var templ_7745c5c3_Var2 string
		templ_7745c5c3_Var2, templ_7745c5c3_Err = templ.JoinStringErrs(ps.Message)
		if templ_7745c5c3_Err != nil {
			return templ.Error{Err: templ_7745c5c3_Err, FileName: `pkg/chals/tmpl/passshare.templ`, Line: 46, Col: 22}
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString(templ.EscapeString(templ_7745c5c3_Var2))
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</p>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		templ_7745c5c3_Err = lock(s.BaseURL).Render(ctx, templ_7745c5c3_Buffer)
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteString("</div>")
		if templ_7745c5c3_Err != nil {
			return templ_7745c5c3_Err
		}
		if !templ_7745c5c3_IsBuffer {
			_, templ_7745c5c3_Err = templ_7745c5c3_Buffer.WriteTo(templ_7745c5c3_W)
		}
		return templ_7745c5c3_Err
	})
}
