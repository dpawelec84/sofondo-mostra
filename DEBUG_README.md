# Debug README Rendering

This file is used to debug rendering artifacts on GitHub.

## 1. Text Block
```text
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
</SubNav>
```

## 2. Javascript Block
```javascript
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
</SubNav>
```

## 3. TSX Block
```tsx
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
</SubNav>
```

## 4. HTML Block
```html
<SubNav variant="simple">
  <a href="/docs/" class="active">Getting Started</a>
</SubNav>
```

## 5. Indented Block (No Fences)

    <SubNav variant="simple">
      <a href="/docs/" class="active">Getting Started</a>
    </SubNav>

## 6. Escaped Entities in Text Block
```text
&lt;SubNav variant="simple"&gt;
  &lt;a href="/docs/" class="active"&gt;Getting Started&lt;/a&gt;
&lt;/SubNav&gt;
```

## 7. Zero Width Space after bracket
```text
<​SubNav variant="simple">
  <​a href="/docs/" class="active">Getting Started<​/a>
<​/SubNav>
```
